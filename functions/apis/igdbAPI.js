/* eslint-disable max-len */
const { getFirestore } = require("firebase-admin/firestore");
const axios = require("axios");

const firestore = getFirestore();

exports.getGamesData = async () => {
  const credentials = {
    client_id: process.env.IGDB_CLIENT_ID,
    client_secret: process.env.IGDB_CLIENT_SECRET,
    grant_type: "client_credentials",
  };
  const bearerToken = await axios.post("https://id.twitch.tv/oauth2/token", null, { params: credentials });
  const headers = {
    "Accept": "application/json",
    "Client-ID": process.env.IGDB_CLIENT_ID,
    "Authorization": "Bearer " + bearerToken.data.access_token,
  };

  try {
    const gameGenres = await axios({
      url: "https://api.igdb.com/v4/genres",
      method: "POST",
      headers: headers,
      data: "fields name; where id = (4,5,10,11,12,13,14,15,31,33); limit 20;",
    });
    await Promise.all(gameGenres.data.map(async (gameGenre) => {
      if (gameGenre.name === "Role-playing (RPG)") {
        gameGenre.name = "RPG";
      }
      if (gameGenre.name === "Real Time Strategy (RTS)") {
        gameGenre.name = "RTS";
      }
      firestore.collection("Games").doc(gameGenre.name).set({ genre: gameGenre.name });
      const gamesByGenre = await axios({
        url: "https://api.igdb.com/v4/games",
        method: "POST",
        headers: headers,
        data: `fields cover.image_id,first_release_date,genres.name,name,summary,total_rating,videos.video_id; sort total_rating desc; where genres=${gameGenre.id} & cover != null & total_rating != null & videos != null; limit 500;`,
      });
      const gamesDataByGenre = await Promise.all(gamesByGenre.data.map(async (gameByGenre) => {
        return {
          genre: gameGenre.name,
          id: gameByGenre.id,
          overview: gameByGenre.summary === undefined ? null : gameByGenre.summary,
          posterPath: `https://images.igdb.com/igdb/image/upload/t_cover_big_2x/${gameByGenre.cover.image_id}.jpg`,
          releaseDate: new Date(gameByGenre.first_release_date).getFullYear().toString(),
          title: gameByGenre.name,
          voteAverage: `${gameByGenre.total_rating}`,
          video: gameByGenre.videos.shift().video_id,
        };
      }));
      gamesDataByGenre.forEach((game) => firestore.collection("Games").doc(game.genre).collection("Game").add(game));
    }));
  } catch (error) {
    console.log(error.message);
    console.log(error.response.data);
  }
};
