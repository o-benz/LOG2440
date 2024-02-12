import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    excludeSpecPattern: "shared.js",
  },
  defaultCommandTimeout: 1000,
  video: false,
});
