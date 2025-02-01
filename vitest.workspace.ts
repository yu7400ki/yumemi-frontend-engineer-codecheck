// biome-ignore lint/correctness/noNodejsModules: This file is meant to be run in Node.js
import path from "node:path";
// biome-ignore lint/correctness/noNodejsModules:
import { fileURLToPath } from "node:url";
import { storybookTest } from "@storybook/experimental-addon-test/vitest-plugin";
import { defineWorkspace } from "vitest/config";

const dirname =
  typeof __dirname !== "undefined"
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/writing-tests/test-addon
export default defineWorkspace([
  "vite.config.ts",
  {
    extends: "vite.config.ts",
    plugins: [
      // The plugin will run tests for the stories defined in your Storybook config
      // See options at: https://storybook.js.org/docs/writing-tests/test-addon#storybooktest
      storybookTest({ configDir: path.join(dirname, ".storybook") }),
    ],
    test: {
      name: "storybook",
      browser: {
        enabled: true,
        headless: true,
        provider: "playwright",
        instances: [
          {
            browser: "chromium",
          },
        ],
      },
      setupFiles: [".storybook/vitest.setup.ts"],
    },
  },
]);
