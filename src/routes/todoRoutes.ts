import { Router } from 'express';
// Perhatikan: updateTodo dan deleteTodo sudah ditambahkan di sini
import { getTodos, getTodoById, createTodo, updateTodo, deleteTodo } from '../controllers/todoController.js';

const router = Router();

// GET /api/todos/:id - Ambil satu todo berdasarkan ID
router.get('/:id', getTodoById);
router.get('/', getTodos);
router.post('/', createTodo);
router.put('/:id', updateTodo);
router.delete('/:id', deleteTodo);

export default router;