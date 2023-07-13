import React, { useEffect, useState } from 'react'
import { DeleteFavoriteItem, GetFavoriteItems } from '../services/FavoritesServices'

const Favorites = (props) => {
  const [cartItems, setCartItems] = useState([])
  const [deleted, setDeleted] = useState({})

  const handleCart = async (userId) => {
    const userCart = await GetFavoriteItems(userId)
    setCartItems(userCart.cart)
  }

  const handleDeleteItem = async (gameId, index) => {
    await DeleteFavoriteItem(gameId)
    cartItems.slice(index, 1) // this is a bit weird, can state be changed this way?
    setDeleted(gameId)
  }
  const noItems = (
    <h2 className="cart-text">Cart is empty, please add games!</h2>
  )
  useEffect(() => {
    handleCart(props.user.id)
  }, [deleted, props.user.id])

  return (
    <div className="cart">
      <h1 className="cart-text">Cart Items:</h1>
    </div>
  )
}

export default Favorites
