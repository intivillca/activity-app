import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import { AppRoutes } from "./pages";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "./auth/AuthContext";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";

const queryClient = new QueryClient();

function App() {
  console.log(process.env);
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <I18nextProvider i18n={i18n}>
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </I18nextProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;
