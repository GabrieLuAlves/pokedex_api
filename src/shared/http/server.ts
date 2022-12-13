import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";

import "reflect-metadata";

import "shared/tsyringe/container";
import "database/datasource";

import { router } from "./routes";
import { AppError } from "errors/AppError";

const app = express()

app.use(express.json());
app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if(err instanceof AppError) {
      return response.status(err.status).json({
        message: err.message
      });
    }

    console.log(err);

    return response.status(500).json({
      message: "Internal server error"
    });
  }
);

app.listen(3333, "localhost", () => {
  console.log(`Server listening at: http://localhost:3333`)
});