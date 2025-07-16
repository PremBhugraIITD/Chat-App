import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import HomePage from "./pages/HomePage.jsx";
import ChatPage from "./pages/ChatPage.jsx";

function App() {
  return (
    <div className="App">
      <Toaster />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chats" element={<ChatPage />} />
      </Routes>
    </div>
  );
}

export default App;
