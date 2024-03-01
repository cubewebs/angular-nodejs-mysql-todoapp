import Server from './models/mysql/server';
import dotenv from 'dotenv';

// Environment variables configuration start
dotenv.config();

const server = new Server();
