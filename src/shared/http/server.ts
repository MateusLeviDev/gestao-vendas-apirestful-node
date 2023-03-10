import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { errors } from 'celebrate';
import routes from './routes';
import AppError from '@shared/errors/AppError';
import '@shared/typeorm'; //importar o typeorm

const app = express();

app.use(cors());
app.use(express.json()); //não interpreta json por padrão

app.use(routes);

app.use(errors());

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statudCode).json({
        status: 'error',
        message: error.message,
      });
    }
    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
    //verificar se o erro é uma instância da clase AppError
  },
);

app.listen(3333, () => {
  console.log('Server started on port 3333!'); //vai chamar o servidor
});
