/* eslint-disable max-len */
const { getFirestore } = require("firebase-admin/firestore");
const axios = require("axios");

const firestore = getFirestore();

exports.getMoviesData = async () => {
  const moviesData = [];

  try {
    const movieGenres = await axios.get("https://api.themoviedb.org/3/genre/movie/list", {
      params: {
        api_key: process.env.TMDB_API_KEY,
        language: "en",
      },
    });
    await Promise.all(movieGenres.data.genres.map(async (movieGenre) => {
      const moviesByGenre = await axios.get("https://api.themoviedb.org/3/discover/movie/", {
        params: {
          api_key: process.env.TMDB_API_KEY,
          region: "US",
          language: "en",
          with_genres: movieGenre.id,
          include_adult: false,
        },
      });
      const movieIdsByGenre = await moviesByGenre.data.results.map((movieByGenre) => movieByGenre.id);
      const moviesDataByGenre = await Promise.all(movieIdsByGenre.map(async (movieIdByGenre) => {
        const movieData = await axios.get("https://api.themoviedb.org/3/movie/" + movieIdByGenre, {
          params: {
            api_key: process.env.TMDB_API_KEY,
            append_to_response: "videos",
          },
        });
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
      moviesDataByGenre.forEach((movie) => firestore.collection("Movies").doc(movie.genre).collection("Movie").add(movie));
    }));
    return moviesData;
  } catch (error) {
    console.log(error.message);
  }
};

