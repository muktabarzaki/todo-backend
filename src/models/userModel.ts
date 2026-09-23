import pool from '../config/db.js';

const userModel = {
  createUser: async (username: string, email: string, password: string) => {
    const [result]: any = await pool.query(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, password]
    );
    return result.insertId;
  },

  getUserByUsername: async (username: string) => {
    const [rows] = await pool.query(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );
    return rows;
  }
};

export default userModel;