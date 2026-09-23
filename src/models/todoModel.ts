import pool from '../config/db.js';

const todoModel = {
  getTodosByUserId: async (userId: number) => {
    const [rows] = await pool.query(
      'SELECT * FROM todos WHERE user_id = ? ORDER BY id DESC',
      [userId]
    );
    return rows;
  },

  getById: async (id: number, userId: number) => {
  const [rows]: any = await pool.query(
    'SELECT * FROM todos WHERE id = ? AND user_id = ?',
    [id, userId]
  );
  return rows[0]; // Kembalikan 1 data, atau undefined jika tidak ditemukan
},

  createTodo: async (userId: number, task: string) => {
    const [result]: any = await pool.query(
      'INSERT INTO todos (user_id, task, is_completed) VALUES (?, ?, false)',
      [userId, task]
    );
    return result.insertId;
  },

  // Update task atau status is_completed
  update: async (id: number, task: string, isCompleted: boolean, userId: number) => {
    const [result]: any = await pool.query(
      'UPDATE todos SET task = ?, is_completed = ? WHERE id = ? AND user_id = ?',
      [task, isCompleted, id, userId]
    );
    return result.affectedRows;
  },

  // Hapus todo berdasarkan id dan userId
  delete: async (id: number, userId: number) => {
    const [result]: any = await pool.query(
      'DELETE FROM todos WHERE id = ? AND user_id = ?',
      [id, userId]
    );
    return result.affectedRows;
  }
};

export default todoModel;