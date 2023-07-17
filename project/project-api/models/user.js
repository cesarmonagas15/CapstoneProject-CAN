const db = require("../db")
const bcrypt = require("bcrypt")
const { BadRequestError, UnauthorizedError } = require("../utils/errors")
const { validateFields } = require("../utils/validate")
const { BCRYPT_WORK_FACTOR } = require("../config")
class User {
  static _createPublicUser(user) {
    return {
      id: user.id,
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email
    }
  }
  static async authenticate(creds) {
    const { email, password } = creds
    const requiredCreds = ["email", "password"]
    validateFields({ required: requiredCreds, obj: creds, location: "user authentication" })
    const user = await User.fetchUserByEmail(email)
    if (user) {
      const isValid = await bcrypt.compare(password, user.password)
      if (isValid === true) {
        return User._createPublicUser(user)
      }
    }
    throw new UnauthorizedError("Invalid username/password")
  }
  static async register(creds) {
    const { username, password, firstName, lastName, email } = creds
    const requiredCreds = ["username", "password", "firstName", "lastName", "email"]
    validateFields({ required: requiredCreds, obj: creds, location: "user registration" })
    const existingUserWithEmail = await User.fetchUserByEmail(email)
    if (existingUserWithEmail) {
      throw new BadRequestError(`Duplicate email: ${email}`)
    }
    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR)
    const result = await db.query(
      `INSERT INTO users (
          username,
          password,
          first_name,
          last_name,
          email
        )
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id, username, first_name, last_name, email`,
      [username, hashedPassword, firstName, lastName, email]
    )
    const user = result.rows[0]
    return User._createPublicUser(user)
  }
  static async fetchUserByEmail(email) {
    const result = await db.query(
      `SELECT id, username, password, first_name, last_name, email
           FROM users
           WHERE email = $1`,
      [email]
    )
    const user = result.rows[0]
    return user
  }
  static async fetchById(userId) {
    const result = await db.query(
      `SELECT id, username, password, first_name, last_name, email
           FROM users
           WHERE id = $1`,
      [userId]
    )
    const user = result.rows[0]
    return User._createPublicUser(user)
  }
}
module.exports = User