const Router = require('express').Router()
const controller = require('../controllers/CartController')

Router.get('/items/:user_id', controller.GetCartItems)
Router.get('/:user_id', controller.GetCart)

Router.post('/:user_id', controller.CreateCart)
Router.post('/item/add', controller.AddToCart)

Router.delete('/item/:game_id', controller.DeleteCartItem)

module.exports = Router
