const Router = require('express').Router();
const controller = require('../controllers/ReviewController');

Router.get('/:game_id', controller.GetReviewsByGame);
Router.post('/add', controller.CreateReview);

module.exports = Router;
