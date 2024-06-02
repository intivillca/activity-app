import { PropsWithChildren, createContext, useContext } from "react";
import { AuthContextValue } from "./types";

const authContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const token = window.localStorage.getItem("authToken") ?? "";

  return (
    <authContext.Provider value={{ isAuthenticated: !!token }}>
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
