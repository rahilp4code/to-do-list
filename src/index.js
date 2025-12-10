import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/todo/App";
import { AuthProvider } from "./components/context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
