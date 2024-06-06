import { PropsWithChildren, createContext, useContext } from "react";
import { AuthContextValue } from "./types";
import { useQuery } from "react-query";
import { getPubkey } from "./auth-routes/pubkey";
import { verifyToken } from "./verifyToken";
import { Spinner } from "@chakra-ui/react";

const authContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const token = window.localStorage.getItem("authToken") ?? "";
  const { data } = useQuery({
    queryKey: ["TokenVerification"],
    queryFn: async () => {
      const pubKey = await getPubkey();
      const verifyKey = await verifyToken(token, pubKey);
      return verifyKey;
    },
  });

  if (!data?.payload.userID) {
    return <Spinner />;
  }

  return (
    <authContext.Provider
      value={{ isAuthenticated: !!token, userID: data?.payload.userID }}
    >
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
