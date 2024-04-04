import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { SelectedProvider } from "./context/Selected.tsx";
import { VolumeProvider } from "./context/VolumeContext.tsx";
import "@fontsource/kaushan-script";
import "@fontsource/averia-serif-libre";
import "@fontsource/victor-mono/500.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <VolumeProvider>
      <SelectedProvider>
        <App />
      </SelectedProvider>
    </VolumeProvider>
  </React.StrictMode>
);
