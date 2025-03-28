const Router = require('express').Router();
const controller = require('../controllers/GamesController');

Router.get('/', controller.GetGames);
Router.get('/popular', controller.GetPopularGames);
Router.get('/recent', controller.GetRecentGames);
Router.get('/:gameId', controller.GetGameById);
Router.get('/name/search', controller.SearchGames);
Router.get('/platforms/search', controller.GetGameByPlatform);
Router.get('/genres/search', controller.GetGameByGenre);

module.exports = Router;
