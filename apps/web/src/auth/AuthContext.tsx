import { PropsWithChildren, createContext, useContext, useState } from "react";
import { useQuery } from "react-query";
import { AuthContextValue } from "./types";
import { verifyToken } from "./verifyToken";
import { JWK } from "jose";
import axios from "axios";

const authContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const token = window.localStorage.getItem("authToken") ?? "";

  const { data: pubKey } = useQuery({
    queryKey: ["AuthServer-pubkey"],
    queryFn: async () => {
      const data = await axios.get<JWK>("http://localhost:3002/pubkey");
      return data.data;
    },
  });

  useQuery({
    queryKey: ["Auth-verifyToken", token],
    queryFn: async () => {
      if (token && pubKey) {
        await verifyToken(token, pubKey);
        setIsAuthenticated(true);
      }
    },
    enabled: !!pubKey && !!token,
  });

  return (
    <authContext.Provider value={{ isAuthenticated }}>
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
