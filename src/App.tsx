import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./Routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./App.css";

function App() {
  return (
    <>
      <QueryClientProvider client={new QueryClient()}>
        <Router basename="/">
      
          <AppRoutes />
        </Router>
      </QueryClientProvider>
    </>
  );
}

export default App;
