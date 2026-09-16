import pool from '../config/db.js';

const userModel = {
    getUserByEmail: async (email: string) => {
        const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        return rows;
    },
    createUser: async (username: string, email: string, passwordHash: string) => {
        const [result] = await pool.query(
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
            [username, email, passwordHash]
        );
        return result;
    }
};

export default userModel;