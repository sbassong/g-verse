import Client from './api'

export const CreateReview = async (data) => {
  try {
    const res = await Client.post(`/reviews`, data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const GetReviewsByGameId = async (gameId) => {
  try {
    const res = await Client.get(`/reviews/game/${gameId}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const GetUserReviews = async (userId) => {
  try {
    const res = await Client.get(`/reviews/user/${userId}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const DeleteReview = async (reviewId) => {
  try {
    const res = await Client.delete(`/reviews/${reviewId}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};


