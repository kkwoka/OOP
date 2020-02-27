const Employee = require("../lib/employee");

describe("Can instantiate Employee instance", () => {
  const e = new Employee();
  expect(typeof(e)).toBe("object");
});

describe("Can set name via constructor arguments", () => {
  const name = "Alice";
  const e = new Employee(name);
  expect(e.name).toBe(name);
});

describe("Can set id via constructor argument", () => {
  const testValue = 100;
  const e = new Employee("Foo", testValue);
  expect(e.id).toBe(testValue);
});

describe("Can set email via constructor argument", () => {
  const testValue = "test@test.com";
  const e = new Employee("Foo", 1, testValue);
  expect(e.email).toBe(testValue);
});

describe("Can get name via getName()", () => {
  const testValue = "Alice";
  const e = new Employee(testValue);
  expect(e.getName()).toBe(testValue);
});

describe("Can get id via getId()", () => {
  const testValue = 100;
  const e = new Employee("Foo", testValue);
  expect(e.getId()).toBe(testValue);
});

describe("Can get email via getEmail()", () => {
  const testValue = "test@test.com";
  const e = new Employee("Foo", 1, testValue);
  expect(e.getEmail()).toBe(testValue);
});

describe("getRole() should return \"Employee\"", () => {
  const testValue = "Employee";
  const e = new Employee("Alice", 1, "test@test.com");
  expect(e.getRole()).toBe(testValue);
});