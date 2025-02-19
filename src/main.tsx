import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { Providers } from "./components/providers";
import "./index.css";
import { css } from "styled-system/css";
import App from "./app.tsx";
import { Spinner } from "./components/ui/spinner";

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
        <Providers>
          <Suspense
            fallback={
              <div
                className={css({
                  h: "100vh",
                  display: "grid",
                  placeItems: "center",
                })}
              >
                <Spinner />
              </div>
            }
          >
            <App />
          </Suspense>
        </Providers>
      </StrictMode>,
    );
  }
});
