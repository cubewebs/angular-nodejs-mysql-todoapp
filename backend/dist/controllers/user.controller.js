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
exports.loginUser = exports.newUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = __importDefault(require("../models/mysql/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const newUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const { user, email, password, createdAt, updatedAt } = req.body;
    // Validate if the user already exists in the database
    user_1.default.findOne({ where: { user } }).then((userFound) => {
        if (userFound) {
            return res.status(400).json({
                msg: `The user ${user} already exists in the database.`,
            });
        }
    });
    const hashsedPassword = yield bcrypt_1.default.hash(password, 10);
    try {
        yield user_1.default.create({
            user,
            email,
            password: hashsedPassword,
            createdAt,
            updatedAt,
        });
        res.json({
            msg: `User ${user} created successfully`,
        });
    }
    catch (error) {
        res.status(400).json({ error });
    }
});
exports.newUser = newUser;
const loginUser = (req, res) => {
    const { user, password } = req.body;
    // Validate if the user exists in the database
    user_1.default.findOne({ where: { user } }).then((userFound) => {
        if (!userFound) {
            return res.status(400).json({
                msg: `The user ${user} does not exist in the database.`,
            });
        }
        // Validate if the password is correct
        bcrypt_1.default.compare(password, userFound.password).then((match) => {
            if (match) {
                // Generate jwt the token and send it to the client as response
                const token = jsonwebtoken_1.default.sign({ user }, process.env.SECRET_KEY || 'Juan123456', { expiresIn: '1h' });
                return res.json({
                    msg: `Welcome ${userFound.user}`,
                    token,
                });
            }
            else {
                return res.status(400).json({
                    msg: `The password is incorrect.`,
                });
            }
        });
    });
};
exports.loginUser = loginUser;
