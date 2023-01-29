/* eslint-disable */
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
    <div className='game-card'>
      <section className="img-wrapper" onClick={() => navigate(`/game/details/${id}`)}><img className="game-image" src={image} alt="" /></section>
      <section className='hover-info'>
        <h3>{title}</h3>
        <p>USD ${price}  |  Rating: {rating}</p>
        {
          (user && authenticated) && <button onClick={handleAddCart} className='add-button' >Add to Cart</button>
          }
      </section>
    </div>

  )
}

export default GameCard