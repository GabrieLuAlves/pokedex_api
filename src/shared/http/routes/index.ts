import { Router } from "express";
import { eggGroupRouter } from "./eggGroup.routes";
import { pokemonRoutes } from "./pokemon.routes";
import { typesRouter } from "./types.routes";

const router = Router();

router.use("/pokemon", pokemonRoutes);
router.use("/egg-group", eggGroupRouter);
router.use("/types", typesRouter);

export { router };