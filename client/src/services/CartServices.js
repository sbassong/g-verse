import Client from './api'

export const GetCart = async (user_id) => {
  try {
    const res = await Client.get(`/cart/${user_id}`)
    return res.data
  } catch (error) {
    throw error
  }
}

export const GetCartItems = async (user_id) => {
  try {
    const res = await Client.get(`/cart/items/${user_id}`)
    return res.data
  } catch (error) {
    throw error
  }
}

export const DeleteCartItem = async (game_id) => {
  try {
    const res = await Client.delete(`/cart/item/${game_id}`)
    return res.data
  } catch (error) {
    throw error
  }
}

export const AddToCart = async (data) => {
  try {
    const res = await Client.post('/cart/item/add', data)
    return res.data
  } catch (error) {
    throw error
  }
}