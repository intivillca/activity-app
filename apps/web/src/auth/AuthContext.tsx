import { PropsWithChildren, createContext, useContext, useEffect } from "react";
import { AuthContextValue } from "./types";
import { useQuery } from "react-query";
import { getPubkey } from "./auth-routes/pubkey";
import { verifyToken } from "./verifyToken";
import { Navigate } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";

const authContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const token = window.localStorage.getItem("authToken") ?? "";

  const { data, isError } = useQuery({
    queryKey: ["TokenVerification"],
    queryFn: async () => {
      const pubKey = await getPubkey();
      const tokenPayload = await verifyToken(token, pubKey);
      return tokenPayload;
    },
  });

  useEffect(() => {
    if (isError) {
      window.localStorage.removeItem("authToken");
    }
  }, [isError]);

  if (isError) {
    return <Navigate to={"/login"} replace />;
  }
  if (!data) {
    return <Spinner />;
  }
  return (
    <authContext.Provider
      value={{
        isAuthenticated: !!token,
        userID: data.payload.userID as string,
      }}
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
