require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const logger = require("morgan");

const AppRouter = require("../routes/AppRouter");

const app = express();
app.use(cors());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", AppRouter);

// EXPORT the app so Vercel's Serverless runtime can wrap it
module.exports = app;
