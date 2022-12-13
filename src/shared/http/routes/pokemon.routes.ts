import { Router } from "express";
import { CreatePokemonController } from "controllers/CreatePokemonController";
import { FindPokemonController } from "controllers/FindPokemonController";
import { UpdatePokemonController } from "controllers/UpdatePokemonController";

const pokemonRoutes = Router();

const createPokemonController = new CreatePokemonController();
const findPokemonController = new FindPokemonController();
const updatePokemonController = new UpdatePokemonController();

pokemonRoutes.post("/", createPokemonController.handle);
pokemonRoutes.get("/", findPokemonController.handle);
pokemonRoutes.put("/", updatePokemonController.handle);

export { pokemonRoutes };