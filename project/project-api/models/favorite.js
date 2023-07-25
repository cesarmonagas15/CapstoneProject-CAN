const db = require("../db")

class Favorite {
  static async add(userId, recipeId) {
    const result = await db.query(
      `INSERT INTO favorites (user_id, recipe_id) VALUES ($1, $2) RETURNING user_id, recipe_id`,
      [userId, recipeId]
    )
    return result.rows[0]
  }

  static async fetchAll(userId) {
    const result = await db.query(
      `SELECT recipe_id FROM favorites WHERE user_id = $1`,
      [userId]
    )
    return result.rows
  }

  static async remove(userId, recipeId) {
    const result = await db.query(
      `DELETE FROM favorites WHERE user_id = $1 AND recipe_id = $2 RETURNING recipe_id`,
      [userId, recipeId]
    )
    return result.rows[0]
  }
}

module.exports = Favorite
