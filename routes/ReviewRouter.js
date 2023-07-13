const Router = require('express').Router()
const controller = require('../controllers/ReviewController')

Router.get('/:game_id', controller.GetReviewsByGame)
Router.post('/add', controller.CreateReview)
// Router.put('/update/:review_id', controller.UpdateReview)
// Router.delete('/:review_id', controller.DeleteReview)

module.exports = Router
