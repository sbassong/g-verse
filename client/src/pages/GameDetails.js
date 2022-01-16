import React, {useEffect, useState} from "react";
import { AddToCart, GetCart } from "../services/CartServices";
import { GetReviewsByGameId } from "../services/ReviewServices";
import ReviewCard from "../components/ReviewCard";
import SubmitReviewForm from "../components/SubmitReviewForm";
import swal from '@sweetalert/with-react'

const GameDetails = ({game, user, authenticated}) => {
  const [cart, setCart] = useState({})
  const [gameReviews, setGameReviews] = useState([])
  const [reviewButton, toggleReviewButton] = useState(false)

  const showReviewForm = () => {
    reviewButton ? toggleReviewButton(false) : toggleReviewButton(true)
  }

  const findCart = async () => {
    const res = await GetCart(user.id)
    setCart(res)
  }

  const getReviews = async () => {
    const reviews = await GetReviewsByGameId(game.id)
    setGameReviews(reviews)
  }

  const handleAddCart = async () => {
    await AddToCart(cart_item)
    swal("Game added to cart!")
  }
  
  const cart_item = {
    game_id: game.id,
    cart_id: cart.id
  }

  const reviewsExist = (
    <h2 className='review-h2'>Reviews:</h2>
  )
  useEffect(() => {
    if (user) findCart()
    getReviews()
  }, [])

  return (
    <div className='details'>
      <section className='top-half'>
        <div><img src={game.background_image} alt="" /></div>
      
        <section className='right-side'>
          <h1>{game.title}</h1>
          <p>Rating: {game.rating}</p>
          <p>USD ${game.price}</p>
          <p>Platform: {game.platform}</p>
          <p>Description: {game.description}</p>
          <button className='add-cart' onClick={handleAddCart} >Add to Cart</button>
          <br/>
          {(user && authenticated) && <button className='show-review-form' onClick={showReviewForm}>Review game</button>}
          {reviewButton && <SubmitReviewForm user={user} game={game}/> }
        </section>
      </section>

      <section className='reviews-cont'>
        {gameReviews.length > 0 && reviewsExist}
        {gameReviews.map(review => (
          <ReviewCard key={review.id} review={review} user={user} />
        ))}
      </section>
      
    </div>
  )
}

export default GameDetails