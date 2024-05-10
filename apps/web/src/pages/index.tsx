import { BrowserRouter, Route, Routes } from "react-router-dom";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          Component={() => <>{"router successfuly configured"}</>}
        />
      </Routes>
    </BrowserRouter>
  );
};
