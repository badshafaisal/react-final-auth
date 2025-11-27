import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import 'izitoast/dist/css/iziToast.min.css';
// -----------------------------
// IMPORT TEMPLATE CSS
// -----------------------------
import "./assets/css/app.min.css";
import "./assets/css/style.css";
import "./assets/css/components.css";
import "./assets/css/custom.css";

// -----------------------------
// IMPORT EXTERNAL LIBRARIES (CSS)
// -----------------------------
import "izitoast/dist/css/iziToast.min.css";


// -----------------------------
// IMPORT TEMPLATE JS (Non-module JS)
// -----------------------------




// -----------------------------
// IMPORT EXTERNAL LIBRARIES (JS)
// -----------------------------
import "izitoast/dist/js/iziToast.min.js";


import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ContextProvider } from "./context/ContextProvider.jsx";

createRoot(document.getElementById("root")).render(
  <ContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ContextProvider>
);
