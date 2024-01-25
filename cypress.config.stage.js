const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "3jast9",
  video: false,
  screenshotOnRunFailure: false,
  e2e: {
    baseUrl: "https://sqlverifier-staging-08050d656f7a.herokuapp.com",
    username: "15minus",
    password: "15minus15minus",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    viewportWidth: 1920,
    viewportHeight: 1200,
  },
});
