const { Router } = require("express");
const videogameRouter = Router();

// Importo los Handlers
const {
  getVideogamesHandler,
  getGameById,
  postVideogames,
} = require("../handlers/videogamesHandlers");

// *Rutas Principales
videogameRouter.get("/", getVideogamesHandler);
videogameRouter.get("/:id", getGameById);
videogameRouter.post("/", postVideogames);

//*Rutas extras
// videogameRouter.get("/:id", updateVideogame);
// videogameRouter.get("/:id", deleteVideogame);

module.exports = videogameRouter;
