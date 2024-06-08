import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { AuthContextValue } from "./types";
import { useQuery } from "react-query";
import { getPubkey } from "./auth-routes/pubkey";
import { verifyToken } from "./verifyToken";
import { Spinner } from "@chakra-ui/react";

const authContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [loading, setLoading] = useState(true);
  const token = window.localStorage.getItem("authToken") ?? "";
  const { data, isError } = useQuery({
    queryKey: ["TokenVerification"],
    queryFn: async () => {
      const pubKey = await getPubkey();
      return verifyToken(token, pubKey);
    },
    onSuccess: () => {
      setLoading(false);
    },
  });

  useEffect(() => {
    if (!data?.payload?.exp) {
      // No expiration time found in token payload
      return;
    }

    const expirationTime = data.payload.exp * 1000; // Convert to milliseconds
    const currentTime = Date.now();

    if (currentTime > expirationTime) {
      // Token has expired, clear it from local storage
      window.localStorage.removeItem("authToken");
    }
  }, [data]);

  if (loading) {
    return <Spinner />;
  }

  if (isError || !data?.payload?.userID) {
    // Handle token verification errors
    console.error("Token verification failed");
    // Perform logout or redirect to login page
    // return <Redirect to="/login" />;
    return null;
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
