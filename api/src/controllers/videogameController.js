const axios = require("axios");
const { Videogame, Genre } = require("../db");
const { API_KEY } = process.env;

// Funcion para traer por //!  id

const getInfoId = async (id) => {
  try {
    let getGameById = await axios.get(
      `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
    );
    getGameById = getGameById.data;
    getGameById = {
      id: getGameById.id,
      image: getGameById.background_image
        ? getGameById.background_image
        : "https://besthqwallpapers.com/Uploads/8-3-2020/124076/thumb2-404-wallpaper-not-found-violet-sign-4k-violet-brickwall-404-wallpaper-not-found-violet-blank-display.jpg",
      name: getGameById.name,
      description: getGameById.description_raw,
      genres: getGameById.genres.map((genre) => genre.name),
      released: getGameById.released,
      rating: getGameById.rating,
      platforms: getGameById.platforms.map((ptf) => ptf.platform.name),
      website: getGameById.website,
    };
    return getGameById;
  } catch (error) {
    return "Not Found";
  }
};

// Funcion para traer //! todos los VG de la API

const getInfo = async () => {
  let i = 1;
  let listGames = [];
  while (i < 2) {
    let getApi = axios.get(
      `https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`
    );
    listGames.push(getApi);

    i++;
  }
  listGames = (await Promise.all(listGames)).map((oneGame) =>
    oneGame.data.results.map((oneGame) => {
      return {
        id: oneGame.id,
        image: oneGame.background_image,
        name: oneGame.name,
        rating: oneGame.rating,
        genres: oneGame.genres.map((gen) => gen.name),
        platforms: oneGame.platforms.map((ptf) => ptf.platform.name),
      };
    })
  );
  let allGames = [];
  listGames.map((vgame) => {
    allGames = allGames.concat(vgame);
  });
  return allGames;
};

// Funcion para traer los juegos //!!!SOLO DB!!!!

const getDB = async () => {
  try {
    let allGamesDB = (
      await Videogame.findAll({
        attributes: [
          "name",
          "image",
          "id",
          "description",
          "released",
          "rating",
          "platforms",
          "created",
        ],
        include: {
          model: Genre,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      })
    ).map((element) => element.toJSON());
    allGamesDB = allGamesDB.map((element) => ({
      id: element.id,
      name: element.name,
      image: element.image,
      description: element.description,
      rating: element.rating,
      released: element.released,
      genres: element.Genres.map((e) => e.name),
      platforms: element.platforms,
      created: element.created,
    }));

    return allGamesDB;
  } catch (error) {
    return { error: "Notfound bro DB" };
  }
};

// Funcion para //! traer y concatenar DB & API
const getAllVideogamesHelper = async () => {
  const apiInfo = await getInfo();
  const dbInfo = await getDB();
  const infoTotal = apiInfo.concat(dbInfo);
  return infoTotal;
};

//! ***************Rutas extras update & delete******por terminar********************
// Funcion para actualizar
// const updateVideogame = async (req, res) => {
//   const {
//     name,
//     description,
//     platforms,
//     released,
//     created,
//     rating,
//     image,
//     genres,
//   } = req.body;
//   const { id } = req.params;

//   try {
//     const updatedVideogame = await Videogame.update(
//       {
//         name,
//         description,
//         platforms,
//         released,
//         created,
//         rating,
//         image,
//         genres,
//       },
//       {
//         where: { id },
//       }
//     );
//     if (updatedVideogame[0] === 0) {
//       return res.status(404).json("No se encontró el videojuego");
//     }

//     const genreNames = await Genre.findAll({
//       where: {
//         name: genres,
//       },
//     });

//     const videogame = await Videogame.findByPk(id);
//     await videogame.setGenres(genreNames);

//     res.status(200).json({
//       message: "Videojuego actualizado exitosamente",
//     });
//   } catch (error) {
//     console.log("claramente no se puede editar esto papa");
//     res.status(400).send({ error: error.message });
//   }
// };

// //Funcion para eliminar

// const deleteVideogame = async (req, res) => {
//   const { id } = req.params;
//   try {
//     await Videogame.destroy({ where: { id } });

//     res.json({
//       message: "Juego  eliminado correctamente!",
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

module.exports = {
  getDB,
  getInfoId,
  getAllVideogamesHelper,
  //deleteVideogame
  //updateVideogame
};
