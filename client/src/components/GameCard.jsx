/* eslint-disable */
import '../styles/gameCard.css'
import React, { useEffect, useState } from "react";
import { AddToCart } from "../services/CartServices";
import { GetCart } from "../services/CartServices";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)


const GameCard = ({id, title, image, price, rating, user, authenticated}) => {
  const [cart, setCart] = useState({})
  const navigate = useNavigate()

  const findCart = async () => {
    const res = await GetCart(user.id)
    setCart(res)
  }

  const handleAddCart = async () => {
    await AddToCart(cart_item)
    MySwal.fire({text: "Game added to cart!"})
  }
  
  const cart_item = {
    game_id: id,
    cart_id: cart.id
  }

  useEffect(() => {
    if (user) findCart()
  }, [])

  return (
    <div className='game-card' onClick={() => navigate(`/game/details/${id}`)}>

      <img className="game-img" src={image} alt="" />

      <div className='game-info'>
        <div className='game-title subtitle'>{title}</div>
        <div className='game-price subtext'>
          <span style={{ color: '#2dc14f'}}>$ </span>{price}
        </div>
        <div className='game-rating subtext'>Rating: {rating}</div>
        
        {
          (user && authenticated) && <button onClick={handleAddCart} className='add-button' >Add to Cart</button>
          }
      </div>
    </div>

  )
}

export default GameCard