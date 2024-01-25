const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "3jast9",
  video: false,
  screenshotOnRunFailure: false,
  e2e: {
    baseUrl: "https://sqlverifier-staging-08050d656f7a.herokuapp.com",
    username: "qwerty2",
    password: "qwerty2",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  viewportWidth: 1366,
  viewportHeight: 768,
});
