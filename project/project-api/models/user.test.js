// users.test.js

const bcrypt = require("bcrypt");
const User = require("./user");
const db = require("../db");

// Mocking the required dependencies for testing
jest.mock("../db");
jest.mock("bcrypt");

describe("User functions", () => {
  const hashedPassword = "hashed_password";
  const fakeUser = {
    id: 1,
    username: "testuser",
    first_name: "Test",
    last_name: "User",
    email: "testuser@example.com",
    password: hashedPassword,
  };

  // Mocking the bcrypt.compare function
  bcrypt.compare.mockResolvedValue(true);

  // Mocking the database query function
  db.query.mockResolvedValue({ rows: [fakeUser] });

  // Test the authenticate function
  test("should authenticate a user with valid credentials", async () => {
    const creds = {
      email: "testuser@example.com",
      password: "password",
    };

    const authenticatedUser = await User.authenticate(creds);
    expect(authenticatedUser).toEqual({
      id: 1,
      username: "testuser",
      first_name: "Test",
      last_name: "User",
      email: "testuser@example.com",
    });
  });

  // Test the register function
  test("should register a new user", async () => {
    const creds = {
      username: "newuser",
      password: "password",
      firstName: "New",
      lastName: "User",
      email: "newuser@example.com",
    };

    db.query.mockResolvedValueOnce({ rows: [] }); // Mocking no user with the same email
    db.query.mockResolvedValueOnce({ rows: [fakeUser] }); // Mocking the result after registration

    bcrypt.hash.mockResolvedValueOnce(hashedPassword);

    const registeredUser = await User.register(creds);
    expect(registeredUser).toEqual({
      id: 1,
      username: "testuser",
      first_name: "Test",
      last_name: "User",
      email: "testuser@example.com",
    });
  });

  // Test the fetchUserByEmail function
  test("should fetch a user by email", async () => {
    const email = "testuser@example.com";
    const fetchedUser = await User.fetchUserByEmail(email);
    expect(fetchedUser).toEqual({
      id: 1,
      username: "testuser",
      first_name: "Test",
      last_name: "User",
      email: "testuser@example.com",
    });
  });

  // Test the fetchById function
  test("should fetch a user by ID", async () => {
    const userId = 1;
    const fetchedUser = await User.fetchById(userId);
    expect(fetchedUser).toEqual({
      id: 1,
      username: "testuser",
      first_name: "Test",
      last_name: "User",
      email: "testuser@example.com",
    });
  });
});
