import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "./index.css";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthContextProvider } from "./context/auth.context";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <ThemeProvider>
        <AuthContextProvider>
          <App />
          <Toaster position="top-center" toastOptions={{ duration: 5000 }} />
        </AuthContextProvider>
      </ThemeProvider>
    </Router>
  </StrictMode>
);
