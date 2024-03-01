import { Router } from 'express';
import {
  getTodos,
  getTodo,
  postTodo,
  putTodo,
  deleteTodo,
} from '../controllers/todo.controller';
import validateToken from './validate-token';

const router = Router();

router.get('/', validateToken, getTodos);
router.get('/:id', getTodo);
router.post('/', postTodo);
router.put('/:id', putTodo);
router.delete('/:id', deleteTodo);

export default router;
