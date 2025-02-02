import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { TanstackQueryProvider } from "./components/providers/tanstack-query";
import "./index.css";
import App from "./app.tsx";

async function enableMocking() {
  if (import.meta.env.VITE_ENABLE_API_MOCK !== "true") {
    return;
  }

  const { worker } = await import("./mocks/browser");

  return worker.start();
}

enableMocking().then(() => {
  const root = document.getElementById("root");
  if (root) {
    createRoot(root).render(
      <StrictMode>
        <TanstackQueryProvider>
          <App />
        </TanstackQueryProvider>
      </StrictMode>,
    );
  }
});
