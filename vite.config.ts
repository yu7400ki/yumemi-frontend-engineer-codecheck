// biome-ignore lint/correctness/noNodejsModules: build-time only
import crypto from "node:crypto";
import { cloudflare } from "@cloudflare/vite-plugin";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

function generateFilePathHash(filePath: string) {
  const hash = crypto.createHash("sha256").update(filePath).digest("base64");
  return hash.replace(/\//g, "_").replace(/\+/g, "-").slice(0, 8);
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  return {
    environments: {
      client: {
        build: {
          rollupOptions: {
            output: {
              entryFileNames: (chunk) => {
                const filePath = chunk.facadeModuleId || chunk.name;
                const hash = generateFilePathHash(filePath);
                return `assets/${hash}-[hash].js`;
              },
              chunkFileNames: (chunk) => {
                const filePath = chunk.facadeModuleId || chunk.name;
                const hash = generateFilePathHash(filePath);
                return `assets/${hash}-[hash].js`;
              },
              assetFileNames: (assetInfo) => {
                const filePath = assetInfo.names.join(".");
                const hash = generateFilePathHash(filePath);
                return `assets/${hash}-[hash].[ext]`;
              },
            },
          },
        },
      },
    },
    plugins: [react(), tsconfigPaths(), mode !== "test" && cloudflare()],
  };
});
