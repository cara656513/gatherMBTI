import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { GlobalStyle } from "./styles/GlobalStyle.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GlobalStyle />
    <App />
  </StrictMode>
<<<<<<< HEAD
)
=======
);
>>>>>>> 61ed2436abc85d89208bbdc32658415b902a330a
