const getGenres = require("../controllers/genreController");
const { Genre } = require("../db");

const getAllGenres = async (req, res) => {
  try {
    const getGenresGames = await getGenres();
    getGenresGames.forEach((gameGenre) => {
      Genre.findOrCreate({
        where: {
          name: gameGenre,
        },
      });
    });

    const allGenres = await Genre.findAll();
    res.status(200).json(allGenres);
  } catch (error) {
    res.status(404).send("Ups! Sorry, :( hemos tenido un error revisa los datos del modelo genreHandler guiño guiño");
  }
};
module.exports = getAllGenres;
