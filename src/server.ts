import "@database/datasource";

import express, { Request, Response } from "express";

const app = express()

app.use(express.json())

app.get("/", (request: Request, response: Response) => {
  return response.json({
    message: "Hello world"
  })
});

app.listen(3333, "localhost", () => {
  console.log(`Server listening at: http://localhost:3333`)
});