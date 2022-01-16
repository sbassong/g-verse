import Client from './api'

export const GetReviewsByGameId = async (game_id) => {
  try {
    const res = await Client.get(`/reviews/${game_id}`)
    return res.data
  } catch (error) {
    throw error
  }
}
export const CreateReview = async (data) => {
  try {
    const res = await Client.post(`/reviews/add`, data)
    return res.data
  } catch (error) {
    throw error
  }
}
export const UpdateReview = async (review_id, data) => {
  try {
    const res = await Client.put(`/reviews/update/${review_id}`, data)
    return res.data
  } catch (error) {
    throw error
  }
}
export const DeleteReview = async (review_id) => {
  try {
    const res = await Client.delete(`/reviews/${review_id}`)
    return res.data
  } catch (error) {
    throw error
  }
}
