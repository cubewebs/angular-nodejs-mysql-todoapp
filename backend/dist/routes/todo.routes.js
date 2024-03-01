"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todo_controller_1 = require("../controllers/todo.controller");
const validate_token_1 = __importDefault(require("./validate-token"));
const router = (0, express_1.Router)();
router.get('/', validate_token_1.default, todo_controller_1.getTodos);
router.get('/:id', todo_controller_1.getTodo);
router.post('/', todo_controller_1.postTodo);
router.put('/:id', todo_controller_1.putTodo);
router.delete('/:id', todo_controller_1.deleteTodo);
exports.default = router;
