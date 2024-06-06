import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import { AppRoutes } from "./pages";
import { QueryClient, QueryClientProvider } from "react-query";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <I18nextProvider i18n={i18n}>
          <AppRoutes />
        </I18nextProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;
