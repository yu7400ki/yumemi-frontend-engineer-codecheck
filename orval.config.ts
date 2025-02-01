import { defineConfig } from "orval";

export default defineConfig({
  resas: {
    output: {
      mode: "tags-split",
      target: "api/gen/resas.ts",
      schemas: "api/gen/models",
      client: "fetch",
      baseUrl: "https://yumemi-frontend-engineer-codecheck-api.vercel.app",
    },
    input: {
      target:
        "https://yumemi-frontend-engineer-codecheck-api.vercel.app/specification",
    },
  },
});
