const admin = require("firebase-admin");
const functions = require("firebase-functions");
const { getFirestore } = require("firebase-admin/firestore");
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const qs = require("qs");

/* eslint-disable max-len */
admin.initializeApp();

// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyAxLTEKN1OcgL5GdHhrHIMPyPUfNixi8ac",
//   authDomain: "ientertain-60ed6.firebaseapp.com",
//   projectId: "ientertain-60ed6",
//   storageBucket: "ientertain-60ed6.appspot.com",
//   messagingSenderId: "241740152230",
//   appId: "1:241740152230:web:c9e843e6470829e8d46367",
//   measurementId: "G-B65DBQJC0N",
// };

const db = getFirestore();

// MIDDLEWARE FROM GOOGLE
const validateFirebaseIdToken = async (req, res, next) => {
  functions.logger.log("Check if request is authorized with Firebase ID token");

  if (
    (!req.headers.authorization ||
      !req.headers.authorization.startsWith("Bearer ")) &&
    !(req.cookies && req.cookies.__session)
  ) {
    functions.logger.error(
      "No Firebase ID token was passed as a Bearer token in the Authorization header.",
      "Make sure you authorize your request by providing the following HTTP header:",
      "Authorization: Bearer <Firebase ID Token>",
      "or by passing a '__session' cookie.",
    );
    res.status(403).send("Unauthorized2");
    return;
  }

  let idToken;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    functions.logger.log("Found 'Authorization' header");
    // Read the ID Token from the Authorization header.
    idToken = req.headers.authorization.split("Bearer ")[1];
  } else if (req.cookies) {
    functions.logger.log("Found '__session' cookie");
    // Read the ID Token from cookie.
    idToken = req.cookies.__session;
  } else {
    // No cookie
    res.status(403).send("Unauthorized3");
    return;
  }

  try {
    const decodedIdToken = await admin.auth().verifyIdToken(idToken);
    functions.logger.log("ID Token correctly decoded", decodedIdToken);
    req.user = decodedIdToken;
    next();
    return;
  } catch (error) {
    functions.logger.error("Error while verifying Firebase ID token:", error);
    res.status(403).send("Unauthorized");
    return;
  }
};

// PROXY SERVER INITIALIZATION
const proxy = express();
proxy.use(cors({ origin: "*" }));
proxy.use(validateFirebaseIdToken);

proxy.get("/movies", async (req, res) => {
  const moviesData = [];

  try {
    const movieGenres = await axios.get("https://api.themoviedb.org/3/genre/movie/list", { params: { api_key: process.env.TMDB_API_KEY, language: "en" } });
    await Promise.all(movieGenres.data.genres.map(async (movieGenre) => {
      const moviesByGenre = await axios.get("https://api.themoviedb.org/3/discover/movie/", { params: { api_key: process.env.TMDB_API_KEY, region: "US", language: "en", with_genres: movieGenre.id, include_adult: false } });
      const movieIdsByGenre = await moviesByGenre.data.results.map((movieByGenre) => movieByGenre.id);
      const moviesDataByGenre = await Promise.all(movieIdsByGenre.map(async (movieIdByGenre) => {
        const movieData = await axios.get("https://api.themoviedb.org/3/movie/" + movieIdByGenre, { params: { api_key: process.env.TMDB_API_KEY, append_to_response: "videos" } });
        const trailers = movieData.data.videos.results.filter((item) => item.type === "Trailer");
        return {
          genre: movieGenre.name,
          id: movieData.data.id,
          overview: movieData.data.overview,
          poster_path: "https://image.tmdb.org/t/p/w500" + movieData.data.poster_path,
          release_date: movieData.data.release_date,
          title: movieData.data.title,
          vote_average: `${Math.round(movieData.data.vote_average * 10) / 10}/10`,
          runtime: movieData.data.runtime,
          video: trailers.length == 0 ? movieData.data.videos.results.shift() : trailers.shift().key,
        };
      }));
      moviesData.push(moviesDataByGenre);
    }));
    res.json(moviesData);
  } catch (error) {
    console.log(error.message);
    res.json(error);
  }
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
  const SPOTIFY_CLIENT_ID = "0a7a6ef6942940eaa7473457cea9a5ee";
  const SPOTIFY_CLIENT_SECRET = "089aeed4f9394587b12bdbf42ef8237b";

  const accessToken = await (async () => {
    const data = qs.stringify({ "grant_type": "client_credentials" });
    try {
      return await axios.post("https://accounts.spotify.com/api/token", data, {
        headers: {
          "Authorization": "Basic " + Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`, "utf-8").toString("base64"),
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
    } catch (error) {
      console.log(error.message);
      console.log(error.response.data);
    }
  })();

  const headers = {
    "Accept": "application/json",
    "Authorization": "Bearer " + accessToken.data.access_token,
    "Content-Type": "application/json",
  };

  const musicGenres = await (async () => {
    try {
      return await axios.get("https://api.spotify.com/v1/browse/categories", {
        headers: headers,
        params: {
          country: "US",
          locale: "en-US",
          limit: 50,
        },
      });
    } catch (error) {
      console.log(error.message);
      console.log(error.response.data);
    }
  })();

  const genrePlaylist = await (async () => {
    try {
      return (await Promise.allSettled(musicGenres.data.categories.items.map(async (item) => {
        const playlist = await axios.get(`https://api.spotify.com/v1/browse/categories/${item.id}/playlists`, {
          headers: headers,
          params: {
            country: "US",
            limit: 1,
          },
        });
        return {
          id: item.id,
          genre: item.name,
          playlistId: playlist.data.playlists.items[0].id,
        };
      }))).filter((item) => item.status === "fulfilled");
    } catch (error) {
      console.log("fdfsd");
    }
  })();

  const genrePlaylistTracksWithArtists = await (async () => {
    return (await Promise.allSettled(genrePlaylist.map(async (item) => {
      try {
        const tracks = await axios.get(`https://api.spotify.com/v1/playlists/${item.value.playlistId}`, {
          headers: headers,
          params: {
            market: "US",
            fields: "tracks.items(track(album(artists)))",
          },
        });
        return {
          ...item.value,
          playlistTracks: tracks.data.tracks.items,
        };
      } catch (error) {
        console.log(error.message);
      }
    }))).filter((item) => item.status === "fulfilled");
  })();

  const genrePlaylistAlbums = await (async () => {
    await genrePlaylistTracksWithArtists.forEach(async (playlist) => {
      playlist.value.playlistTracks =
        (await Promise.allSettled(playlist.value.playlistTracks.map(async (tracks) => {
          const albums = await axios.get(`https://api.spotify.com/v1/artists/${tracks.track.album.artists[0].id}/albums`, {
            headers: headers,
            params: {
              market: "US",
              include_groups: "album",
              limit: 1,
            },
          });
          return {
            ...playlist.value,
            albumId: albums.data.items[0].id,
          };
        }))).filter((item) => item.status === "fulfilled");
    });
  })();

  // const genrePlaylistAlbums = await (async () => {
  //   return await Promise.all(genrePlaylistTracksWithArtists.map(async (playlist) => {
  //     return (await Promise.allSettled(playlist.value.playlistTracks.map(async (tracks) => {
  //       const albums = await axios.get(`https://api.spotify.com/v1/artists/${tracks.track.album.artists[0].id}/albums`, {
  //         headers: headers,
  //         params: {
  //           market: "US",
  //           include_groups: "album",
  //           limit: 1,
  //         },
  //       });
  //       return {
  //         ...playlist.value,
  //         albumId: albums.data.items[0].id,
  //       };
  //     }))).filter((item) => item.status === "fulfilled");
  //   }));
  // })();

  // const genrePlaylistAlbum = await (async () => {
  //   return await Promise.all(genrePlaylistAlbums.map(async (playlist) => {
  //     return (await Promise.allSettled(playlist.map(async (item) => {
  //       const album = await axios.get(`https://api.spotify.com/v1/albums/${item.value.albumId}`, {
  //         headers: headers,
  //         params: {
  //           market: "US",
  //           include_groups: "album",
  //           limit: 1,
  //         },
  //       });
  //       return {
  //         ...playlist,
  //         artistId: album.data.artists[0].id,
  //         artistName: album.data.artists[0].name,
  //         albumName: album.data.name,
  //         albumImage: album.data.images[0].url,
  //         releaseDate: album.data.release_date,
  //         totalTracks: album.data.total_tracks,
  //         tracks: album.data.tracks.items,
  //       };
  //     }))).filter((item) => item.status === "fulfilled");
  //   }));
  // })();


  //console.log(genrePlaylistAlbums);
  console.log(genrePlaylistTracksWithArtists[0].value.playlistTracks);
  console.log(accessToken.data.access_token);

  res.json("Hi");
  // } catch (error) {
  //   console.log(error.message);
  //   console.log(error.response.data);
  //   res.json(error);
  // }
});

exports.proxy = functions.https.onRequest(proxy);
