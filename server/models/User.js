// models/User.js
const pool = require('../db');


class User {
  static async findById(id) {
    const query = 'SELECT * FROM users WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  // Add more methods for CRUD operations if needed
}

module.exports = User;
