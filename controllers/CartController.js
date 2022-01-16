const { Cart, Game, Cart_game } = require('../models')
const { Op, literal, fn, col } = require('sequelize')

const GetCartItems = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      where: {user_id: req.params.user_id},
      include: {model: Game, as: 'cart', through: {attributes: []} }
    })
    res.send(cart)
  } catch (error) {
    throw error
  }
}
const GetCart = async (req, res) => {
  try {
    let user_id = parseInt(req.params.user_id)
    const cart = await Cart.findOne({
      where: {user_id: user_id}
    })
    res.send(cart)
  } catch (error) {
    throw error
  }
}

const CreateCart = async (req, res) => {
  try {
    let user_id = parseInt(req.params.user_id)
    let cartBody = {
      user_id,
      ...req.body
    }
    let cart = await Cart.create(cartBody)
    res.send(cart)
  } catch (error) {
    throw error
  }
}

const AddToCart = async (req, res) => {
  try {
    const cart_item = await Cart_game.create({...req.body}, {returning: true})
    res.send(cart_item)
  } catch (error) {
    throw error
  }
}

const DeleteCartItem = async (req, res) => {
  try {
    let game_id = parseInt(req.params.game_id)
    await Cart_game.destroy({ where: { game_id: game_id } })
    res.send({ message: `Deleted cart item with an id of ${game_id}` })
  } catch (error) {
    throw error
  }
}

module.exports = {
  GetCartItems,
  GetCart,
  CreateCart,
  AddToCart,
  DeleteCartItem
}
