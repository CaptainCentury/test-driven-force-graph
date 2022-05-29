const greeting = (name) => `Hello, ${name}!`;

describe("greeting()", () => {
  it("says hello", () => {
    expect(greeting("Graph")).toBe("Hello, Graph!");
  });
});
