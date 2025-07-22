import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "@/components/ui/provider";
import { BrowserRouter } from "react-router-dom";
import ChatProvider from "./context/ChatProvider.jsx";
import FetchProvider from "./context/FetchProvider.jsx";

createRoot(document.getElementById("root")).render(
  <Provider>
    <BrowserRouter>
      <FetchProvider>
        <ChatProvider>
          <App />
        </ChatProvider>
      </FetchProvider>
    </BrowserRouter>
  </Provider>
);
