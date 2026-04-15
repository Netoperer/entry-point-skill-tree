// import "./app.css";
//
// import ReactDOM from "react-dom/client";
// import { BrowserRouter } from "react-router";
// import App from "./app";
//
// const root = document.getElementById("root")!;
//
// ReactDOM.createRoot(root).render(
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>,
// );
// i

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
