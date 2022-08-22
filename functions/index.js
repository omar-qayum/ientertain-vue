/* eslint-disable max-len */
const admin = require("firebase-admin");
const functions = require("firebase-functions");
const { getFirestore } = require("firebase-admin/firestore");
const express = require("express");
const cors = require("cors");

admin.initializeApp();
const firestore = getFirestore();

const { validateFirebaseIdToken } = require("./middleware.js");
const { getMoviesData } = require("./apis/tmdbAPI.js");
const { getGamesData } = require("./apis/igdbAPI.js");
const { getMusicData } = require("./apis/spotifyAPI.js");
const { getBooksData } = require("./apis/googleAPI.js");

// PROXY SERVER INITIALIZATION
const proxy = express();
proxy.use(cors({ origin: "*" }));
proxy.use(validateFirebaseIdToken);

proxy.get("/movies", async (req, res) => {
  const moviesData = await getMoviesData();
  res.status(200).json(moviesData);
});

proxy.get("/games", async (req, res) => {
  const gamesData = await getGamesData();
  res.status(200).json(gamesData);
});

proxy.get("/music", async (req, res) => {
  await getMusicData();
  res.status(200).send("Music data uploaded to database!");
});

proxy.get("/books", async (req, res) => {
  await getBooksData();
  res.status(200).send("Books data uploaded to database!");
});

exports.proxy = functions.https.onRequest(proxy);

exports.registerUser = functions.https.onCall(async (data, context) => {
  await admin.auth().setCustomUserClaims(context.auth.token.uid, {
    admin: true,
    plan: data.plan,
  });
  await firestore.collection("Users").add({
    email: context.auth.token.email,
    plan: data.plan,
    created: admin.firestore.Timestamp.now(),
    expiry: admin.firestore.Timestamp.fromDate(new Date(admin.firestore.Timestamp.now().toMillis() + 2678400000)),
  });
});
