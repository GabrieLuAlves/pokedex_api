import { Router } from "express";
import { pokemonRoutes } from "./pokemon.routes";

const router = Router();

router.use("/pokemon", pokemonRoutes);

export { router };