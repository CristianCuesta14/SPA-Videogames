const { Genre, Videogame } = require("../db");

const {
  getInfoId,
  getAllVideogamesHelper,
  getDB,
} = require("../controllers/videogameController");

//Funcion para traer VG
const getVideogamesHandler = async (req, res) => {
  const { name } = req.query;
  try {
    const allVideogames = await getAllVideogamesHelper();
    if (name) {
      let videogameName = allVideogames.filter((e) => {
        e.name.toLowerCase().includes(name.toLowerCase());
      });

      let nombre = "string";
      nombre.toLowerCase;

      videogameName.length
        ? res.status(200).json(videogameName)
        : res.status(404).send("You Need a validate Name, Crack!!!");
    } else res.status(200).json(allVideogames);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Funcion para traer por Id
const getGameById = async (req, res) => {
  const { id } = req.params;
  try {
    if (id.includes("-")) {
      const allId = await getDB();
      let gameId = allId.find((element) => element.id === id);
      res.status(200).json(gameId);
    } else {
      const getGames = await getInfoId(id);
      res.status(200).json(getGames);
    }
  } catch (error) {
    console.log("error crack, mira en los handlers guiño guiño");
    res.status(400).json({ error: error.message });
  }
};

//! Funcion para crear un VG
const postVideogames = async (req, res) => {
  const {
    name,
    description,
    platforms,
    released,
    created,
    rating,
    image,
    genres,
  } = req.body;
  try {
    const newVideogame = await Videogame.create({
      name,
      description,
      platforms,
      released,
      created,
      rating,
      image,
    });
    const genreNames = await Genre.findAll({
      where: {
        name: genres,
      },
    });
    await newVideogame.addGenres(genreNames);
    res.status(200).json({
      message: "Videogame added successfully",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//!codigo para probar en postman

	// "name"        : "lix",
	// "description" : "juego de gatos",
	// "platforms"   : "pc",
	// "image"       : "ttps://www.funimada.com/assets/images/cards/big/bday-838.gif",
	// "released"    : "2019-09-12",
	// "rating"      : "1"

module.exports = {
  getVideogamesHandler,
  getGameById,
  postVideogames,
};
