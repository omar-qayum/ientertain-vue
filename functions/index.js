/* eslint-disable max-len */
const admin = require("firebase-admin");
const functions = require("firebase-functions");
const express = require("express");
const axios = require("axios");
const cors = require("cors");

admin.initializeApp();

const { validateFirebaseIdToken } = require("./middleware.js");
const { getMoviesData } = require("./apis/tmdbAPI.js");
const { getMusicData } = require("./apis/spotifyAPI.js");

// PROXY SERVER INITIALIZATION
const proxy = express();
proxy.use(cors({ origin: "*" }));
proxy.use(validateFirebaseIdToken);

proxy.get("/movies", async (req, res) => {
  const moviesData = await getMoviesData();
  res.status(200).json(moviesData);
});

proxy.get("/games", async (req, res) => {
  const gamesData = [];
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
      const gamesByGenre = await axios({
        url: "https://api.igdb.com/v4/games",
        method: "POST",
        headers: headers,
        data: `fields cover.image_id,first_release_date,genres.name,name,summary,total_rating,videos.video_id; sort total_rating desc; where genres=${gameGenre.id} & cover != null & total_rating != null & videos != null; limit 500;`,
      });
      const gamesDataByGenre = await Promise.all(gamesByGenre.data.map(async (gameByGenre) => {
        return {
          genre: gameByGenre.genres[0].name,
          id: gameByGenre.id,
          overview: gameByGenre.summary,
          poster_path: `https://images.igdb.com/igdb/image/upload/t_cover_big_2x/${gameByGenre.cover.image_id}.jpg`,
          release_date: new Date(gameByGenre.first_release_date).getFullYear().toString(),
          title: gameByGenre.name,
          vote_average: `${gameByGenre.total_rating}%`,
          runtime: 100,
          video: gameByGenre.videos.shift().video_id,
        };
      }));
      gamesData.push(gamesDataByGenre);
    }));
    gamesData.sort((a, b) => {
      return a[0].genre.localeCompare(b[0].genre);
    });
    res.json(gamesData);
  } catch (error) {
    console.log(error.message);
    res.json(error);
  }
});

proxy.get("/music", async (req, res) => {
  await getMusicData();
  res.status(200).send("Music data uploaded to database!");
});

exports.proxy = functions.https.onRequest(proxy);
