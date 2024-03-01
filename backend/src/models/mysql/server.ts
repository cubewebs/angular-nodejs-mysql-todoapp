import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import routesTodo from '../../routes/todo.routes';
import routesUser from '../../routes/user.routes';
import Todo from './todo';
import User from './user';

class Server {
  private app: Application;
  private port: string;

  constructor() {
    this.app = express();
    this.port = process.env.PORT ?? '3001';
    this.listen();
    // the middlewares must be called before the routes
    this.middlewares();
    this.routes();
    this.dbConnect();
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`App running on port ${this.port}`);
    });
  }

  routes() {
    this.app.get('/', (req: Request, res: Response) => {
      res.json({
        msg: 'API Working',
      });
    });
    this.app.use('/api/todos', routesTodo);
    this.app.use('/api/users', routesUser);
  }

  middlewares() {
    // Parse the body
    this.app.use(express.json());
    // Cors
    this.app.use(cors());
  }

  async dbConnect() {
    try {
      await Todo.sync();
      await User.sync();
    } catch (err) {
      console.log(err);
      console.log('Error when connecting to database.');
    }
  }
}

export default Server;
