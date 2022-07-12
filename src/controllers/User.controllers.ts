import { NextFunction, Request, Response } from 'express';
import UserMeddle from '../moddle/user.moddle';
const userMuddle = new UserMeddle();
import User from '../types/User.type';
import { Error } from '../interfaces/Error.interface';
const HandleError = (message: string, status: number): Error => {
  const error: Error = new Error(message);
  error.status = status;
  return error;
};
export const Create = async (
  req: Request,
  res: Response,
  Next: NextFunction
) => {
  try {
    if ((req.body.name, req.body.email, req.body.password)) {
      const User: User = await userMuddle.Create(req.body);
      if (User) {
        res.status(201).json({
          status: 'success',
          message: 'User created',
          data: { ...User },
        });
      } else {
        Next(
          HandleError('name and email and password and id is Required', 400)
        );
      }
    } else {
      Next(HandleError('User Not Created', 404));
    }
  } catch (error) {
    Next(error as Error);
  }
};
export const GetAll = async (
  _req: Request,
  res: Response,
  Next: NextFunction
) => {
  try {
    const Users: User[] = await userMuddle.GetAll();
    if (Users.length > 0) {
      res.status(200).json({
        status: 'success',
        message: 'Users retrieved',
        data: { Users },
      });
    } else {
      Next(HandleError('Users not retrieved', 404));
    }
  } catch (error) {
    Next(error as Error);
  }
};
export const Get = async (req: Request, res: Response, Next: NextFunction) => {
  try {
    if (req.params.id) {
      const User: User = await userMuddle.Get(req.params.id);
      if (User) {
        res.status(200).json({
          status: 'success',
          message: 'User retrieved',
          data: { ...User },
        });
      } else {
        Next(HandleError('User not found', 404));
      }
    } else {
      Next(HandleError('id is required', 404));
    }
  } catch (error) {
    Next(error as Error);
  }
};
export const Update = async (
  req: Request,
  res: Response,
  Next: NextFunction
) => {
  try {
    if (req.body.id && req.body.name && req.body.email && req.body.password) {
      const user: User = await userMuddle.Update(req.body);
      if (user) {
        res.status(200).json({
          status: 'success',
          message: 'User updated',
          data: { ...user },
        });
      } else {
        Next(HandleError('User not found', 404));
      }
    } else {
      Next(HandleError('id and name and email and password is Required', 400));
    }
  } catch (error) {
    Next(error as Error);
  }
};
export const Delete = async (
  req: Request,
  res: Response,
  Next: NextFunction
) => {
  try {
    if (!req.params.id) {
      const user: User = await userMuddle.Delete(req.params.id);
      if (user) {
        res.status(200).json({
          status: 'success',
          message: 'User deleted',
          data: { ...user },
        });
      } else {
        Next(HandleError('User not found', 404));
      }
    } else {
      Next(HandleError('Id is required', 404));
    }
  } catch (error) {
    Next(error as Error);
  }
};
export const DeleteAll = async (
  req: Request,
  res: Response,
  Next: NextFunction
) => {
  try {
    const Users: User[] = await userMuddle.DeleteAll();
    if (Users.length > 0) {
      res.status(200).json({
        status: 'success',
        message: 'Users deleted',
        data: { Users },
      });
    } else {
      Next(HandleError('No users deleted', 404));
    }
  } catch (error) {
    Next(error as Error);
  }
};
