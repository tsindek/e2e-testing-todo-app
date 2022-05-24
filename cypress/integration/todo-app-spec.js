/// <reference types = "cypress" />

describe("todo-app", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("can add new todo", () => {
    cy.get("#todo-list li").should("have.length", 0);
    cy.get("#new-todo").type("test1");
    cy.get("#add-todo").click();
    cy.get("#todo-list li").should("have.length", 1);
  });

  it("can filter different todo states", () => {
    cy.get("#todo-list li").should("have.length", 0);
    cy.get("#new-todo").type("test1");
    cy.get("#add-todo").click();
    cy.get("#new-todo").type("test2");
    cy.get("#add-todo").click();
    cy.get("#todo-list li:first-child input").check();

    //check "Show all todos"
    cy.get("#filter-all").check();
    cy.get("#todo-list li").should("be.visible");

    //check "Show done todos"
    cy.get("#filter-done").check();
    cy.get("#todo-list")
      .children(".done")
      .each((element, index, list) => {
        expect(Cypress.$(element)).to.be.visible;
      });

    cy.get("#todo-list li")
      .not(".done")
      .each((element, index, list) => {
        expect(Cypress.$(element)).to.not.be.visible;
      });

    //check "Show open todos"
    cy.get("#filter-open").check();
    cy.get("#todo-list")
      .children(".done")
      .each((element, index, list) => {
        expect(Cypress.$(element)).to.not.be.visible;
      });

    cy.get("#todo-list li")
      .not(".done")
      .each((element, index, list) => {
        expect(Cypress.$(element)).to.be.visible;
      });
  });

  it("can delete done todos", () => {
    cy.get("#new-todo").type("test1");
    cy.get("#add-todo").click();
    cy.get("#todo-list li:first-child input").check();
    cy.get("#delete-todos").click();
    cy.get("#todo-list li").should("have.length", 0);
  });

  it("can doesn't allow duplicate todos", () => {
    cy.get("#new-todo").type("test1");
    cy.get("#add-todo").click();
    cy.get("#todo-list li").should("have.length", 1);
    cy.get("#new-todo").type("test1");
    cy.get("#add-todo").click();
    cy.get("#todo-list li").should("have.length", 1);
  });
});
