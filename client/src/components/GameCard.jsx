/* eslint-disable */
import '../styles/gameCard.css'
import React, { useEffect, useState } from "react"
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import Rating from '@mui/material/Rating';
import { ReactComponent as AddIcon } from '../../src/styles/icons/add-to-cart.svg';
import { styled } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#ff6d75',
  },
  '& .MuiRating-iconHover': {
    color: '#ff3d47',
  },
});


const GameCard = ({id, title, image, price, rating, user, authenticated}) => {
  const [favorite, setFavorites] = useState({})
  const [favRating, setRating] = useState(0);
  const [isHover, toggleIsHover] = useState(false)
  const navigate = useNavigate()

  const cart_item = {
    game_id: id,
    cart_id: favorite.id
  }

  // const fetchFavorites = async () => {
  //   const res = await GetFavorites(user.id)
  //   setFavorites(res)
  // }

  // const handleAddToFavorites = async () => {
  //   await AddToFavorites(cart_item)
  // }

  const handleCardHover = (e) => {
    if (e?.type === 'mouseenter') toggleIsHover(true)
    else if (e?.type === 'mouseleave') toggleIsHover(false)
  }
  

  useEffect(() => {
    if (user) fetchFavorites()
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
          <div className='game-rating subtext' style={{ color: '#fdca52'}}>{rating}</div>
          <StyledRating
            name="customized-color"
            defaultValue={favRating}
            getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
            max={1}
            icon={<FavoriteIcon fontSize="inherit" />}
            emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
            onChange={(event, newRating) => {
              setRating(newRating);
            }}
          />
          
        </div>

      </div>

    </div>

  )
}

export default GameCard