const { Router } = require("express");

const getAllGenres = require("../handlers/genreHandler");
const genreRouter = Router();

genreRouter.get("/", getAllGenres);

module.exports = genreRouter;


