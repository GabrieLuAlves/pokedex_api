import { ListEggGroupsController } from "controllers/ListEggGroupsController";
import { Router } from "express";

const eggGroupRouter = Router();

const listEggGroupsController = new ListEggGroupsController();

eggGroupRouter.get("/", listEggGroupsController.handle);

export { eggGroupRouter };