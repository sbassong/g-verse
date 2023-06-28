/* eslint-disable */
import '../styles/gameCard.css'
import React, { useEffect, useState } from "react";
import { ReactComponent as AddCardIcon } from '../../src/styles/icons/add-to-cart.svg';

import { AddToCart } from "../services/CartServices";
import { GetCart } from "../services/CartServices";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)


const GameCard = ({id, title, image, price, rating, user, authenticated}) => {
  const [cart, setCart] = useState({})
  const [isHover, toggleIsHover] = useState(false)
  const navigate = useNavigate()

  const findCart = async () => {
    const res = await GetCart(user.id)
    setCart(res)
  }

  const handleAddCart = async () => {
    await AddToCart(cart_item)
    MySwal.fire({text: "Game added to cart!"})
  }

  const handleCardHover = (e) => {
    if (e?.type === 'mouseenter') toggleIsHover(true)
    else if (e?.type === 'mouseleave') toggleIsHover(false)
  }
  
  const cart_item = {
    game_id: id,
    cart_id: cart.id
  }

  useEffect(() => {
    if (user) findCart()
  }, [])

  return (
    <div
      className='game-card'
      onMouseEnter={handleCardHover}
      onMouseLeave={handleCardHover}
      >

      <img 
        onClick={() => navigate(`/game/details/${id}`)}
        className="game-img"
        src={image}
        alt={`${title} image`} 
      />

      <div className='game-info'>
        <div className='game-title subtitle'>{title}</div>

        <div className='game-numbers' style={{ fontWeight: 'bold' }}>
          <div className='game-price' style={{ color: '#2dc14f'}}>${price}</div>
          {
            isHover ?
              <div onClick={handleAddCart} className='add-game-button subtext' >
                <AddCardIcon className='add-cart-icon' /> 
                Add
              </div>
              : 
              <div className='game-rating subtext' style={{ color: '#fdca52'}}>{rating}</div>
          }
          
        </div>

      </div>

    </div>

  )
}

export default GameCard