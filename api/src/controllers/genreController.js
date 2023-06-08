const axios = require("axios");
const { API_KEY } = process.env;
const URL = "https://api.rawg.io/api/genres?key=";

const getGenres = async () => {
  try {
    let getGenres = await axios.get(`${URL}${API_KEY}`);

    const genres = getGenres.data.results.map((gene) => gene.name);
    return genres;
  } catch (error) {
    return { error: "Genres Not found." };
  }
};

module.exports = getGenres;
