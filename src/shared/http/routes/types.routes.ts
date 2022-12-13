import { ListTypesController } from "controllers/ListTypesController";
import { Router } from "express";

const typesRouter = Router();

const listTypesController = new ListTypesController();

typesRouter.get("/", listTypesController.handle);

export { typesRouter };