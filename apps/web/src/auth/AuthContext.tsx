import { PropsWithChildren, createContext, useContext, useEffect } from "react";
import { AuthContextValue } from "./types";
import { useQuery } from "react-query";
import { getPubkey } from "./auth-routes/pubkey";
import { verifyToken } from "./verifyToken";
import { Navigate } from "react-router-dom";

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
    if (!data) {
      window.localStorage.removeItem("authToken");
    }
  }, [data]);

  if (isError || !data?.payload?.userID) {
    return <Navigate to={"/login"} replace />;
  }

  return (
    <authContext.Provider
      value={{ isAuthenticated: !!token, userID: data.payload.userID }}
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
