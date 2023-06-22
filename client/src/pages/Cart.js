import React, { useEffect, useState } from 'react'
import CartItem from '../components/CartItem'
import { DeleteCartItem, GetCartItems } from '../services/CartServices'

const Cart = (props) => {
  const [cartItems, setCartItems] = useState([])
  const [deleted, setDeleted] = useState({})

  const handleCart = async (userId) => {
    const userCart = await GetCartItems(userId)
    setCartItems(userCart.cart)
  }

  const handleDeleteItem = async (gameId, index) => {
    await DeleteCartItem(gameId)
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
      {cartItems.length < 1 && noItems}
      {cartItems.map((item, index) => (
        <div className="cart-cont">
          <CartItem
            key={item.id}
            title={item.title}
            image={item.background_image}
            price={item.price}
          />
          <button
            onClick={() => handleDeleteItem(item.id, index)}
            className="delete-button"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  )
}

export default Cart
