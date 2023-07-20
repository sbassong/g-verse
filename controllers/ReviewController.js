const { Review } = require('../models');
const { v4: uuidv4 } = require('uuid');

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
    // const id = uuidv4();
    // req.body['id'] = id;
    const review = await Review.create(req.body);
    res.send(review);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  GetReviewsByGame,
  CreateReview,
};
