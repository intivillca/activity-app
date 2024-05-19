import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import { AppRoutes } from "./pages";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "./auth/AuthContext";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;
