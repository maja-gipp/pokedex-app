import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Pokemon } from "./Pokemon";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <div>
        <Routes>
          <Route element={<App />} path="/" />
          <Route element={<Pokemon />} path="/pokemon/:name" />
        </Routes>
      </div>
    </BrowserRouter>
  </QueryClientProvider>
);
