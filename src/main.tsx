import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ConfigProvider } from "antd";
import AuthProvider from "./providers/AuthProvider.tsx";
import "./index.css";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <ConfigProvider
        theme={{
          token: {
            fontFamily: "inherit",
          },
        }}
      >
        <App />
        <Toaster />
      </ConfigProvider>
    </AuthProvider>
  </React.StrictMode>
);
