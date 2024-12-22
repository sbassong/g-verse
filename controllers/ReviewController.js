const { supabase } = require('../supabaseClient.js');


const GetReviewsByGame = async (req, res) => {
  const { gameId } = req.params;

  try {
    const { data: reviews, error } = await supabase
      .from("reviews")
      .select("id, gameId, content, userRating, userId")
      .eq("gameId", gameId);

    if (error) return res.send(error)
    else res.send(reviews);
  } catch (error) {
    res.send(error);
  }
};

const CreateReview = async (req, res) => {
  try {
    const { data: reviews, error } = await supabase
    .from('reviews')
    .insert([
      req.body,
    ])
    .select();
    
    if (error) return res.send(error)
    else res.send(reviews[0])
  } catch (error) {
    res.send(error);
  }
};

const GetUserReviews = async (req, res) => {
  const { userId } = req.params;

  try {
    const { data: reviews, error } = await supabase
      .from("reviews")
      .select("id, gameId, content, userRating, userId")
      .eq("userId", userId);

    if (error) return res.status(400).send(error);
    else res.send(reviews);
  } catch (error) {
    res.status(500).send(error);
  }
};

const DeleteReview = async (req, res) => {
  const { reviewId } = req.params;

  try {
    const { data:reviews, error } = await supabase
      .from('reviews')
      .delete()
      .eq('id', reviewId)
      .select("id, gameId, content, userRating, userId");

    if (error) return res.status(400).send(error);
    else res.send(reviews[0]);

  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  GetReviewsByGame,
  CreateReview,
  GetUserReviews,
  DeleteReview
};
