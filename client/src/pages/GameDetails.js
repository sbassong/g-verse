/* eslint-disable */
import '../../src/styles/GameDetails.css'
import React from 'react'
import {useEffect, useState} from "react";
// import { AddToFavorites, GetFavorites } from "../services/FavoritesServices";
import { GetReviewsByGameId } from "../services/ReviewServices";
import ReviewCard from "../components/ReviewCard";
import AddReview from '../components/AddReview';
import { Box, Typography } from '@mui/material';

const GameDetails = ({ game, user, authenticated}) => {
  const [cart, setCart] = useState({})
  const [gameReviews, setGameReviews] = useState([])
  const [reviewButton, toggleReviewButton] = useState(false)

  const showReviewForm = () => {
    reviewButton ? toggleReviewButton(false) : toggleReviewButton(true)
  }

  const findCart = async () => {
    const res = await GetFavorites(user.id)
    setCart(res)
  }

  const getReviews = async () => {
    const reviews = await GetReviewsByGameId(game.id)
    setGameReviews(reviews)
  }

  const handleAddCart = async () => {
    await AddToFavorites(cart_item)
    MySwal.fire({text: "Game added to cart!"})
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
  }, [user])

  return (
    <div className='game-details'>
      <div className='top-half'>
        <img className='img-div' src={game.background_image} alt={`${game.title} poster`} />
      
        <div className='right-side'>
          <div className='title'>{game.title}</div>
          <div className='subtitle' style={{ color: '#2dc14f'}}>${ game.price } USD</div>
          <div
            className='subtitle'
            style={{ color: 'rgb(175, 175, 175)', fontWeight: 'bold'}}
          >
            Rating <span 
                style={{ color: '#fdca52', fontWeight: 'bold'}}
                className='subtitle'
              >
                {game.rating}
              </span>
          </div>
          <div 
            className='subtitle'
            style={{ color: 'rgb(175, 175, 175)'}}
          >
            Platforms: <span className='subtitle'>{game.platform}</span>
          </div>
          <div 
            className='details-desc'
            style={{ color: 'rgb(190, 190, 190)'}}
          >
            {game.description}
          </div>
          <div onClick={handleAddCart} className='add-game-button' >Add to Cart</div>
          <br/>
        </div>
      </div>

      <Box
        sx={{
          padding: 2,
          marginTop: 2,
          display: 'flex',
        }}
      >
        <AddReview user={user} game={game}/>

        <Box 
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {gameReviews.length > 0
            ? gameReviews.map((review) => <ReviewCard review={review}/>)
            : <Typography variant="body2" color="text.secondary">Be the first to leave a review!</Typography>
          }
        </Box>
      </Box>
      
    </div>
  )
}

export default GameDetails