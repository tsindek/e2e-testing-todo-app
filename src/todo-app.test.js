///<reference types="jest" />

import { isDuplicate } from "./todo-app.js";

describe("todo-app", () => {
  it("...", () => {
    const todos = [{ todo: "test", done: false }];
    const newTodo = "test";
    const r = isDuplicate(newTodo, todos);
  });
});

//test
