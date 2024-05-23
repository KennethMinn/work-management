import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ToastProvider from "./providers/toast-provider";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <MantineProvider>
        <ToastProvider />
        <App />
      </MantineProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
