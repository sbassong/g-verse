const Router = require('express').Router();
const UserRouter = require('./UserRouter');
const GamesRouter = require('./GamesRouter');
const ReviewRouter = require('./ReviewRouter');
const RawgRouter = require('./RawgRouter');

Router.use('/users', UserRouter);
Router.use('/games', GamesRouter);
Router.use('/reviews', ReviewRouter);
Router.use('/rawg', RawgRouter);

module.exports = Router;
