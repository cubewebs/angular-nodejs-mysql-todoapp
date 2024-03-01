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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validateToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers['authorization'];
    console.log(token);
    if (!token) {
        return res.status(401).json({
            msg: 'There is no token in the request.',
        });
    }
    else {
        if (token.startsWith('Bearer ')) {
            try {
                const bearerToken = token.slice(7);
                console.log(bearerToken);
                const payload = jsonwebtoken_1.default.verify(bearerToken, process.env.SECRET_KEY || 'Juan123456');
                console.log(payload);
                req.body = payload;
                next();
            }
            catch (error) {
                return res.status(401).json({
                    msg: 'Invalid token',
                });
            }
        }
    }
});
exports.default = validateToken;
