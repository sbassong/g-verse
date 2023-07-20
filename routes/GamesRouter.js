const Router = require('express').Router()
const controller = require('../controllers/GamesController')

Router.get('/game/:game_id', controller.GetOneGame)
Router.get('/popular', controller.GetPopularGames)
Router.get('/recent', controller.GetRecentGames)
Router.get('/listings', controller.GetGames)
Router.get('/search', controller.GetGameByTitle)

Router.post('/new_game', controller.CreateGame)

module.exports = Router
