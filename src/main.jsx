import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "./components/ui/provider.jsx";
import { Toaster } from "./components/ui/toaster.jsx";
import { ColorModeProvider } from "./components/ui/color-mode.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider>
      <ColorModeProvider>
        <App />
      </ColorModeProvider>
      <Toaster />
    </Provider>
  </StrictMode>
);
