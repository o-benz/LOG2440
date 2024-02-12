const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    excludeSpecPattern: "shared.js",
    supportFile: false
  },
  defaultCommandTimeout: 1000,
  video: false,
  projectId: "jxcynk",
});
