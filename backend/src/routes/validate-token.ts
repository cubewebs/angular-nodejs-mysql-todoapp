import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const validateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers['authorization'];
  console.log(token);

  if (!token) {
    return res.status(401).json({
      msg: 'There is no token in the request.',
    });
  } else {
    if (token.startsWith('Bearer ')) {
      try {
        const bearerToken = token.slice(7);
        console.log(bearerToken);

        const payload = jwt.verify(
          bearerToken,
          process.env.SECRET_KEY || 'Juan123456'
        );
        console.log(payload);

        req.body = payload;
        next();
      } catch (error) {
        return res.status(401).json({
          msg: 'Invalid token',
        });
      }
    }
  }
};

export default validateToken;
