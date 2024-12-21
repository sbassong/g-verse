const Router = require('express').Router();
const controller = require('../controllers/ReviewController');

Router.post('/', controller.CreateReview);
Router.get('/game/:game_id', controller.GetReviewsByGame);
Router.get('/user/:user_id', controller.GetUserReviews);
Router.delete('/:review_id', controller.DeleteReview);

module.exports = Router;
