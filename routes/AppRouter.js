const Router = require('express').Router()
const UserRouter = require('./UserRouter')
const GamesRouter = require('./GamesRouter')
const ReviewRouter = require('./ReviewRouter')

Router.use('/users', UserRouter)
Router.use('/games', GamesRouter)
Router.use('/reviews', ReviewRouter)

module.exports = Router
