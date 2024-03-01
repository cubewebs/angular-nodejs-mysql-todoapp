import { Request, Response } from 'express';
import Todo from '../models/mysql/todo';

export const getTodos = async (req: Request, res: Response) => {
  const listTodos = await Todo.findAll();
  res.json(listTodos);
};

export const getTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const todo = await Todo.findByPk(id);
  if (todo) {
    res.json(todo);
  } else {
    res.status(404).json({
      status: 404,
      msg: `The task with the id: ${id} does not exist on the database.`,
    });
  }
};

export const postTodo = async (req: Request, res: Response) => {
  const { body } = req;
  try {
    await Todo.create(body);
    res.json({
      msg: 'The product has been created successfully.',
      body,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      msg: `Vaya!! Ha ocurrido un error comuniquese con el administrador.`,
      error,
    });
  }
};

export const putTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const todo = await Todo.findByPk(id);
    if (todo) {
      await todo.update(body);
      res.json({
        msg: `The task has been updated successfully.`,
        body,
      });
    } else {
      res.status(404).json({
        msg: `The task with id: ${id} does not exist in the database.`,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({
      msg: `An error has occure. Please contact your administrator.`,
      error,
    });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const todo = await Todo.findByPk(id);
  if (!todo) {
    res.status(404).json({
      status: 404,
      msg: `The task with the id: ${id} does not exist in the database so it could not be deleted.`,
    });
  } else {
    // Here you use the const todo not Todo Table
    await todo.destroy();
    res.json({
      msg: `The task with the id: ${id} was deleted successfully.`,
      id,
    });
  }
};
