const Router = require('express').Router();
const { FetchRawgGames } = require('../utils');

Router.get('/', FetchRawgGames);

module.exports = Router;

