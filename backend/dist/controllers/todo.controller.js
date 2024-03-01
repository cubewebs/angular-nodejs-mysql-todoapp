"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.putTodo = exports.postTodo = exports.getTodo = exports.getTodos = void 0;
const todo_1 = __importDefault(require("../models/mysql/todo"));
const getTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listTodos = yield todo_1.default.findAll();
    res.json(listTodos);
});
exports.getTodos = getTodos;
const getTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const todo = yield todo_1.default.findByPk(id);
    if (todo) {
        res.json(todo);
    }
    else {
        res.status(404).json({
            status: 404,
            msg: `The task with the id: ${id} does not exist on the database.`,
        });
    }
});
exports.getTodo = getTodo;
const postTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        yield todo_1.default.create(body);
        res.json({
            msg: 'The product has been created successfully.',
            body,
        });
    }
    catch (error) {
        console.log(error);
        res.status(404).json({
            msg: `Vaya!! Ha ocurrido un error comuniquese con el administrador.`,
            error,
        });
    }
});
exports.postTodo = postTodo;
const putTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const todo = yield todo_1.default.findByPk(id);
        if (todo) {
            yield todo.update(body);
            res.json({
                msg: `The task has been updated successfully.`,
                body,
            });
        }
        else {
            res.status(404).json({
                msg: `The task with id: ${id} does not exist in the database.`,
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(404).json({
            msg: `An error has occure. Please contact your administrator.`,
            error,
        });
    }
});
exports.putTodo = putTodo;
const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const todo = yield todo_1.default.findByPk(id);
    if (!todo) {
        res.status(404).json({
            status: 404,
            msg: `The task with the id: ${id} does not exist in the database so it could not be deleted.`,
        });
    }
    else {
        // Here you use the const todo not Todo Table
        yield todo.destroy();
        res.json({
            msg: `The task with the id: ${id} was deleted successfully.`,
            id,
        });
    }
});
exports.deleteTodo = deleteTodo;
