import { faker } from "@faker-js/faker";

describe("API tests", () => {
  let adminData = { username: "admin", password: "admin", rememberMe: true };
  let testUserDataReg;
  beforeEach("Create a test user data", () => {
    testUserDataReg = {
      login: faker.person.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
  });
  it("Test1: Registration with valid data", () => {
    cy.customRequest("POST", "register", testUserDataReg).then((response) => {
      expect(response.status).to.eq(201);
    });
  });

  it("Test2: Authentication of a user with valid data", () => {
    let userData = {
      username: "qwerty2",
      password: "qwerty2",
    };
    cy.customRequest("POST", "authenticate", userData).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it("Test3: Activation an account by admin with a role 'student'", () => {
    cy.customRequest("POST", "authenticate", adminData).then((response) => {
      let adminToken = response.body.id_token;
      cy.customRequest("POST", "register", testUserDataReg, adminToken).then(
        (response) => {
          cy.customRequest(
            "GET",
            `admin/users/${testUserDataReg.login.toLowerCase()}`,
            "",
            adminToken
          ).then((response) => {
            let userID = response.body.id;
            cy.customRequest(
              "PUT",
              "admin/users",
              {
                id: userID,
                login: testUserDataReg.login.toLowerCase(),
                firstName: "string",
                lastName: "string",
                email: testUserDataReg.email,
                imageUrl: "string",
                activated: true,
                lastModifiedDate: "2023-11-22T09:58:25.682Z",
                authorities: ["ROLE_USER_STUDENT"],
              },
              adminToken
            );
          });
        }
      );
    });
  });

  it("Test4: Registration a user with already existing email", () => {
    let userData = {
      login: "Harry",
      email: "qwerty2@qw.qw",
      password: "hello123",
    };
    cy.customRequest("POST", "register", userData).then((response) => {
      expect(response.status).to.eq(409);
    });
  });

  it("Test5: Registration a user with an empty password", () => {
    let userData = {
      login: faker.internet.userName(),
      email: faker.internet.email(),
    };
    cy.customRequest("POST", "register", userData).then((response) => {
      expect(response.status).to.eq(400);
    });
  });

  it("Test6: Registration a user with a password length - 4 symbols", () => {
    let testData = {
      login: faker.person.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password({ length: 4 }),
    };
    cy.customRequest("POST", "register", testData).then((response) => {
      expect(response.status).to.eq(201);
    });
  });

  it("Test7: Registration a user with a password length - 3 symbols", () => {
    let testData = {
      login: faker.person.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password({ length: 3 }),
    };
    cy.customRequest("POST", "register", testData).then((response) => {
      expect(response.status).to.eq(400);
    });
  });

  it("Test8: Registration a user with a password length - 100 symbols", () => {
    let testData = {
      login: faker.person.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password({ length: 100 }),
    };
    cy.customRequest("POST", "register", testData).then((response) => {
      expect(response.status).to.eq(201);
    });
  });

  it("Test9: Registration a user with a password length - 101 symbols", () => {
    let testData = {
      login: faker.person.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password({ length: 101 }),
    };
    cy.customRequest("POST", "register", testData).then((response) => {
      expect(response.status).to.eq(400);
    });
  });

  it("Test10: Registration a user with an empty login", () => {
    let testData = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    cy.customRequest("POST", "register", testData).then((response) => {
      expect(response.status).to.eq(400);
    });
  });

  it("Test11: Authentication of the user whose account wasn't activated", () => {
    let testData = {
      login: faker.person.firstName().toLowerCase(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    cy.customRequest("POST", "register", testData).then((response) => {
      expect(response.status).to.eq(201);
      cy.customRequest("POST", "authenticate", testData).then((response) => {
        expect(response.status).to.eq(400);
      });
    });
  });

  it("Test12: Activation an account by admin with a role 'teacher'", () => {
    cy.customRequest("POST", "authenticate", adminData).then((response) => {
      let adminToken = response.body.id_token;
      cy.customRequest("POST", "register", testUserDataReg, adminToken).then(
        (response) => {
          cy.customRequest(
            "GET",
            `admin/users/${testUserDataReg.login.toLowerCase()}`,
            "",
            adminToken
          ).then((response) => {
            let userID = response.body.id;
            cy.customRequest(
              "PUT",
              "admin/users",
              {
                id: userID,
                login: testUserDataReg.login.toLowerCase(),
                firstName: "string",
                lastName: "string",
                email: testUserDataReg.email,
                imageUrl: "string",
                activated: true,
                lastModifiedDate: "2023-11-22T09:58:25.682Z",
                authorities: ["ROLE_USER_TEACHER"],
              },
              adminToken
            );
          });
        }
      );
    });
  });

  it("Test13: Activation an account by admin with a role 'admin'", () => {
    cy.customRequest("POST", "authenticate", adminData).then((response) => {
      let adminToken = response.body.id_token;
      cy.customRequest("POST", "register", testUserDataReg, adminToken).then(
        (response) => {
          cy.customRequest(
            "GET",
            `admin/users/${testUserDataReg.login.toLowerCase()}`,
            "",
            adminToken
          ).then((response) => {
            let userID = response.body.id;
            cy.customRequest(
              "PUT",
              "admin/users",
              {
                id: userID,
                login: testUserDataReg.login.toLowerCase(),
                firstName: "string",
                lastName: "string",
                email: testUserDataReg.email,
                imageUrl: "string",
                activated: true,
                lastModifiedDate: "2023-11-22T09:58:25.682Z",
                authorities: ["ROLE_ADMIN"],
              },
              adminToken
            );
          });
        }
      );
    });
  });

  it("Test14: Authentication of a user with the teacher role", () => {
    let userData = {
      username: "qwerty3",
      password: "qwerty3",
    };
    cy.customRequest("POST", "authenticate", userData).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it("Test15: Authentication of a user with the admin role", () => {
    cy.customRequest("POST", "authenticate", adminData).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it("Test16: Admin creates a task with valid data", () => {
    let taskData = {
      text: faker.lorem.word(),
      answer: faker.lorem.word(),
      title: faker.lorem.word(),
    };
    cy.customRequest("POST", "authenticate", adminData).then((response) => {
      let adminToken = response.body.id_token;
      cy.customRequest("POST", "tasks", taskData, adminToken).then(
        (response) => {
          expect(response.status).to.eq(201);
        }
      );
    });
  });

  it("Test17: Admin creates a task  with invalid data", () => {
    let taskData = {
      text: "",
      answer: "",
      title: "",
    };
    cy.customRequest("POST", "authenticate", adminData).then((response) => {
      let adminToken = response.body.id_token;
      cy.customRequest("POST", "tasks", taskData, adminToken).then(
        (response) => {
          expect(response.status).to.eq(201);
        }
      );
    });
  });

  it("Test18: Admin recieves a task list", () => {
    cy.customRequest("POST", "authenticate", adminData).then((response) => {
      let adminToken = response.body.id_token;
      cy.customRequest("GET", "tasks?size=10&page=0", "", adminToken).then(
        (response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.exist;
        }
      );
    });
  });

  it("Test19: Admin changes a task with valid data (PATCH method)", () => {
    let task_ID = 3817;
    cy.customRequest("POST", "authenticate", adminData).then((response) => {
      let adminToken = response.body.id_token;
      cy.customRequest(
        "PATCH",
        `tasks/${task_ID}`,
        { id: task_ID, text: faker.lorem.word() },
        adminToken
      ).then((response) => {
        expect(response.status).to.eq(200);
      });
    });
  });

  it("Test20: Admin changes a task with valid data (PUT method)", () => {
    let task_ID = 3817;
    cy.customRequest("POST", "authenticate", adminData).then((response) => {
      let adminToken = response.body.id_token;
      cy.customRequest(
        "PUT",
        `tasks/${task_ID}`,
        {
          id: task_ID,
          text: "qwerty",
          answer: "qwerty",
          title: "qwerty",
        },
        adminToken
      ).then((response) => {
        expect(response.status).to.eq(200);
      });
    });
  });

  it("Test21: Admin changes a task with invalid data (PUT method)", () => {
    let task_ID = 3817;
    cy.customRequest("POST", "authenticate", adminData).then((response) => {
      let adminToken = response.body.id_token;
      cy.customRequest(
        "PUT",
        `tasks/${task_ID}`,
        { id: task_ID, text: "", answer: "", title: "" },
        adminToken
      ).then((response) => {
        expect(response.status).to.eq(400);
      });
    });
  });

  it("Test22: Admin deletes an existing task(pre-request: to create a task)", () => {
    let taskData = {
      text: faker.lorem.word(16),
      answer: faker.lorem.word(10),
      title: faker.lorem.word(10),
    };
    let task_ID;
    cy.customRequest("POST", "authenticate", adminData).then((response) => {
      let adminToken = response.body.id_token;
      cy.customRequest("POST", "tasks", taskData, adminToken).then(
        (response) => {
          expect(response.status).to.eq(201);
          task_ID = response.body.id;
          cy.customRequest("DELETE", `tasks/${task_ID}`, "", adminToken).then(
            (response) => {
              expect(response.status).to.eq(204);
            }
          );
        }
      );
    });
  });

  it("Test23: Admin deletes a task with an invalid ID", () => {
    let task_ID = 11111154456542222221;
    cy.customRequest("POST", "authenticate", adminData).then((response) => {
      let adminToken = response.body.id_token;
      cy.customRequest("DELETE", `tasks/${task_ID}`, "", adminToken).then(
        (response) => {
          expect(response.status).to.eq(400);
        }
      );
    });
  });
});
