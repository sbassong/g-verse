const { Review, User } = require('../models')

const GetReviewsByGame = async (req, res) => {
  try {
    const reviews = await Review.findAll({
      where: { game_id: req.params.game_id },
    })
    res.send(reviews)
  } catch (error) {
    throw error
  }
}

const CreateReview = async (req, res) => {
  try {
    const review = await Review.create(req.body)
    res.send(review)
  } catch (error) {
    throw error
  }
}

// const UpdateReview = async (req, res) => {
//   try {
//     let review_id = parseInt(req.params.review_id)
//     let updatedReview = await Review.update(req.body, {
//       where: { id: review_id },
//       returning: true
//     })
//     res.send(updatedReview)
//   } catch (error) {
//     throw error
//   }
// }

// const DeleteReview = async (req, res) => {
//   try {
//     await Review.destroy({
//       where: { id: req.params.review_id }
//     })
//     res.send({ msg: 'Review successfully deleted' })
//   } catch (error) {
//     throw error
//   }
// }

module.exports = {
  GetReviewsByGame,
  CreateReview,
  // UpdateReview,
  // DeleteReview
}
