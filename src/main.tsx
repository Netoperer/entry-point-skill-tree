import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import Home from "./pages/home";
import { StrictMode } from "react";
import EntryPoint from "./pages/entry-point";
import { enableMapSet } from "immer";
import { NuqsAdapter } from "nuqs/adapters/react-router/v7";

const root = document.getElementById("root")!;

enableMapSet();

ReactDOM.createRoot(root).render(
  <StrictMode>
    <NuqsAdapter>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </NuqsAdapter>
  </StrictMode>,
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="entry-point" element={<EntryPoint />} />
    </Routes>
  );
}
