import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ToastProvider from "./providers/toast-provider";
import { DatesProvider } from "@mantine/dates";
import "dayjs/locale/ru";
import "@mantine/dates/styles.css";

const queryClient = new QueryClient({
  // defaultOptions: {
  //   queries: {
  //     staleTime: 0,
  //   },
  // },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <MantineProvider>
        <ToastProvider />
        <DatesProvider
          settings={{
            locale: "en",
            firstDayOfWeek: 0,
            weekendDays: [0],
            timezone: "Asia/Yangon",
          }}
        >
          <App />
        </DatesProvider>
      </MantineProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
