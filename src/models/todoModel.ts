import pool from '../config/db.js';

const todoModel = {
    getTodosByUserId: async (user_id: number) => {
        const [rows] = await pool.query('SELECT * FROM todos WHERE user_id = ?', [user_id]);
        return rows;
    },
    createTodo: async (user_id: number, task: string) => {
        const [result] = await pool.query(
            'INSERT INTO todos (user_id, task) VALUES (?, ?)',
            [user_id, task]
        );
        return result;
    }
};

export default todoModel;