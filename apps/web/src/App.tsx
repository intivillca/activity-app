import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import { AppRoutes } from "./pages";

function App() {
  return (
    <ChakraProvider>
      <AppRoutes />
    </ChakraProvider>
  );
}

export default App;
