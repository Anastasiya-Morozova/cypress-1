const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "3jast9",
  e2e: {
    baseUrl: "https://sqlverifier-live-6e21ca0ed768.herokuapp.com",
    username: "qwerty2",
    password: "qwerty2",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
