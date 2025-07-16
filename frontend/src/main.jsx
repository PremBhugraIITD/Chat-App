import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "@/components/ui/provider";
import { BrowserRouter } from "react-router-dom";
import ChatProvider from "./context/ChatProvider.jsx";

createRoot(document.getElementById("root")).render(
  <Provider>
    <BrowserRouter>
      <ChatProvider>
        <App />
      </ChatProvider>
    </BrowserRouter>
  </Provider>
);
