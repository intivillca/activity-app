import { PropsWithChildren, createContext, useContext } from "react";
import { useQuery } from "react-query";
import { AuthContextValue } from "./types";
import { verifyToken } from "./verifyToken";
import { JWK } from "jose";
import axios from "axios";

const authContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const token = window.localStorage.getItem("authToken") ?? "";

  const { data: pubKey } = useQuery({
    queryKey: ["AuthServer-pubkey"],
    queryFn: async () => {
      const data = await axios.get<JWK>("http://localhost:3002/pubkey");
      return data.data;
    },
  });

  const { data: verifyTokenResult } = useQuery({
    queryKey: ["Auth-verifyToken", token],
    queryFn: async () => {
      if (!token || !pubKey) {
        return false;
      }
      return verifyToken(token, pubKey);
    },
    enabled: !!pubKey && !!token,
  });

  if (verifyTokenResult) {
    return (
      <authContext.Provider value={{ isAuthenticated: !!verifyTokenResult }}>
        {children}
      </authContext.Provider>
    );
  }
  return (
    <authContext.Provider value={{ isAuthenticated: false }}>
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => {
  const usedCtx = useContext(authContext);
  if (!usedCtx) {
    throw Error("Missing Auth Context");
  }
  return usedCtx;
};
