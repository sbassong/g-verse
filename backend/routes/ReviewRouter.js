const Router = require('express').Router();
const controller = require('../controllers/ReviewController');

Router.post('/', controller.CreateReview);
Router.get('/game/:gameId', controller.GetReviewsByGame);
Router.get('/user/:userId', controller.GetUserReviews);
Router.delete('/:reviewId', controller.DeleteReview);

module.exports = Router;
