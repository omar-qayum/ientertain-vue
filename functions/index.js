const admin = require("firebase-admin");
const functions = require("firebase-functions");
const express = require("express");
const axios = require("axios");
const cors = require("cors");

/* eslint-disable max-len */
admin.initializeApp();

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
proxy.use(cors({origin: "*"}));
proxy.use(validateFirebaseIdToken);

proxy.get("/movies/:endpoint(*)", async (req, res) => {
  const VUE_APP_TMDB_API_KEY = "4b2ec768b38ae5e3a536aed029b916c2";

  try {
    req.query.api_key = VUE_APP_TMDB_API_KEY;
    const data = await axios.get("https://api.themoviedb.org/3/" + req.params.endpoint, {params: {api_key: VUE_APP_TMDB_API_KEY, ...req.query}});
    res.json(data.data);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

proxy.post("/games/:endpoint/", async (req, res) => {
  const VUE_APP_IGDB_CLIENT_ID = "aqqkp7i37wvsko881f5dwqaf1iw327";
  const VUE_APP_IGDB_CLIENT_SECRET = "p9zy4ck4trjse8aejciwy5lqvu7ijz";
  const credentials = {
    client_id: VUE_APP_IGDB_CLIENT_ID,
    client_secret: VUE_APP_IGDB_CLIENT_SECRET,
    grant_type: "client_credentials",
  };

  try {
    const bearer = await axios.post("https://id.twitch.tv/oauth2/token", null, {
      params: credentials,
    });
    const data = await axios({
      url: "https://api.igdb.com/v4/" + req.params.endpoint,
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Client-ID": VUE_APP_IGDB_CLIENT_ID,
        "Authorization": "Bearer " + bearer.data.access_token,
      },
      data: req.body.query,
    });
    res.json(data.data);
  } catch (error) {
    res.json(error);
  }
});

exports.proxy = functions.https.onRequest(proxy);
