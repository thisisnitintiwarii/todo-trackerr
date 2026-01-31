import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
export const API_BASE_URL = "https://todo-tracker-lz4t.onrender.com";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
