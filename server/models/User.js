// models/User.js
const pool = require('../db');
const bcrypt = require('bcrypt');

class User {
  static async findByLogin(login) {
    try {
      const query = 'SELECT * FROM users WHERE login = $1';
      const result = await pool.query(query, [login]);
      return result.rows[0];
    } catch (error) {
      console.error('Error finding user by login:', error);
      throw error;
    }
  }

  static async create(login, password, name) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const query = 'INSERT INTO users (login, password, name) VALUES ($1, $2, $3) RETURNING *';
      const result = await pool.query(query, [login, hashedPassword, name]);
      return result.rows[0];
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }
}

module.exports = User;
