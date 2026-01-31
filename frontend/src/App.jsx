import React, { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Router from "./app/Router.jsx";
import { AuthProvider } from "./context/AuthContest.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <AuthProvider>
        <Router />
      </AuthProvider>
    </div>
  );
}

export default App;
