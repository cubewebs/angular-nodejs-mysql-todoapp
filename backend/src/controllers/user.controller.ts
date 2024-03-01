import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/mysql/user';
import jwt from 'jsonwebtoken';

export const newUser = async (req: Request, res: Response) => {
  console.log(req.body);
  const { user, email, password, createdAt, updatedAt } = req.body;

  // Validate if the user already exists in the database
  User.findOne({ where: { user } }).then((userFound) => {
    if (userFound) {
      return res.status(400).json({
        msg: `The user ${user} already exists in the database.`,
      });
    }
  });

  const hashsedPassword = await bcrypt.hash(password, 10);

  try {
    await User.create({
      user,
      email,
      password: hashsedPassword,
      createdAt,
      updatedAt,
    });

    res.json({
      msg: `User ${user} created successfully`,
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const loginUser = (req: Request, res: Response) => {
  const { user, password } = req.body;

  // Validate if the user exists in the database
  User.findOne({ where: { user } }).then((userFound) => {
    if (!userFound) {
      return res.status(400).json({
        msg: `The user ${user} does not exist in the database.`,
      });
    }

    // Validate if the password is correct
    bcrypt.compare(password, userFound.password).then((match) => {
      if (match) {
        // Generate jwt the token and send it to the client as response
        const token = jwt.sign(
          { user },
          process.env.SECRET_KEY || 'Juan123456',
          { expiresIn: '1h' }
        );
        return res.json({
          msg: `Welcome ${userFound.user}`,
          token,
        });
      } else {
        return res.status(400).json({
          msg: `The password is incorrect.`,
        });
      }
    });
  });
};
