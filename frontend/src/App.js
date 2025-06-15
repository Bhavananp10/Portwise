import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ClientInfo from "./pages/ClientInfo"; // ✅ Add this if missing
import SplashScreen from "./pages/SplashScreen";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/client/:id" element={<ClientInfo />} />
      </Routes>
    </Router>

  );
}
