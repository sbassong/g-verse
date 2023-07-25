const { Review } = require('../models');

const GetReviewsByGame = async (req, res) => {
  try {
    const reviews = await Review.findAll({
      where: { game_id: req.params.game_id },
      order: [['createdAt', 'DESC']],
    })
    res.send(reviews);
  } catch (error) {
    throw error;
  }
};

const CreateReview = async (req, res) => {
  try {
    const review = await Review.create(req.body);
    res.send(review);
  } catch (error) {
    res.send({message: 'Error: unsuccessful submission'});
  }
};

module.exports = {
  GetReviewsByGame,
  CreateReview,
};
