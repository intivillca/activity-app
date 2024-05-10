import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import { AppRoutes } from "./pages";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <AppRoutes />
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;
