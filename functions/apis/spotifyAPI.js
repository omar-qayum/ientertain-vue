/* eslint-disable max-len */
const { getFirestore } = require("firebase-admin/firestore");
const qs = require("qs");
const axios = require("axios");

const firestore = getFirestore();
const musicGenres = ["Alternative", "Blues", "Classical", "Country", "Electronic", "Gospel", "Heavy-metal", "Hip-hop", "Kids", "Opera", "Pop", "Rock", "Techno"];
const sleep = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

exports.getMusicData = async () => {
  const data = qs.stringify({"grant_type": "client_credentials"});

  try {
    // Retrieve bearer acces token
    const accessToken = await axios.post("https://accounts.spotify.com/api/token", data, {
      headers: {
        "Authorization": "Basic " + Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`, "utf-8").toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    // Set headers for all Axios GET requests
    const headers = {
      "Accept": "application/json",
      "Authorization": "Bearer " + accessToken.data.access_token,
      "Content-Type": "application/json",
    };
    console.log(accessToken.data.access_token);
    // Get albums for each genre
    const genreAlbums = (await Promise.allSettled(musicGenres.map(async (genre) => {
      const tracks = (await axios.get("https://api.spotify.com/v1/search", {
        headers: headers,
        params: {
          q: `genre:${genre} `,
          type: "track",
          market: "CA",
          limit: 50,
        },
      })).data.tracks.items;
      return {
        genre: genre,
        genreAlbums: tracks.filter((track) => track.album.album_type === "album"),
      };
    }))).filter((genre) => genre.status === "fulfilled" && genre.value.genreAlbums.length > 10);

    // Get relevant data and tracks for each album in every genre and write the results to Firestore
    for (const genre of genreAlbums) {
      await sleep(3000);
      const albums = (await Promise.allSettled(genre.value.genreAlbums.map(async (album) => {
        const tracks = (await axios.get(`https://api.spotify.com/v1/albums/${album.album.id}/tracks`, {
          headers: headers,
          params: {
            market: "CA",
          },
        })).data.items;
        const trackDetails = tracks.map((track) => {
          return {
            trackName: track.name,
            trackPreview: track.preview_url,
          };
        });
        return {
          genre: genre.value.genre,
          artist: album.album.artists[0].name,
          albumName: album.album.name,
          albumImage: album.album.images[0].url,
          releaseDate: album.album.release_date,
          totalTracks: album.album.total_tracks,
          tracks: trackDetails,
        };
      }))).filter((item) => item.status === "fulfilled");
      albums.forEach((album) => firestore.collection("Music").doc(genre.value.genre).collection("Albums").add(album.value));
      console.log(genre.value.genre, albums.length);
    }
  } catch (error) {
    console.log(error.message);
    console.log(error.response.data);
  }
};

