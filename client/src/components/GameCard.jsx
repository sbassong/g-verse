/* eslint-disable */
import '../styles/gameCard.css'
import React, { useEffect, useState } from "react"
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import Rating from '@mui/material/Rating';
import { styled } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import { UpdateUserFavorites } from '../services/UserServices';

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#ff6d75',
  },
  '& .MuiRating-iconHover': {
    color: '#ff3d47',
  },
});


const GameCard = ({ id, title, image, price, rating, user, setUser, authenticated, userFavorites, setUserFavorites, isFavorite }) => {
  const [isFavoriteGame, setIsFavorite] = useState(null)
  const [isHover, toggleIsHover] = useState(false);
  const navigate = useNavigate();

  const handleCardHover = (e) => {
    if (e?.type === 'mouseenter') toggleIsHover(true);
    else if (e?.type === 'mouseleave') toggleIsHover(false);
  };

  const updateUserFavoritesArr = async (data) => {
    if (!user) return;
    const updatedUser = await UpdateUserFavorites(user?.id, { favorites: data });
    return updatedUser;
  };

  const removeFavoriteId = (value, index, arr) => {
    if (value !== id) return true;
    else return false;
  }
  
  const handleOnFavoriteChange = async (newRating) => {
    let currUserFavorites = userFavorites;
    
    if (newRating === 1) currUserFavorites?.push(id);
    else currUserFavorites = currUserFavorites?.filter(removeFavoriteId);

    setIsFavorite(newRating)
    setUserFavorites(currUserFavorites);
    const updatedUser = await updateUserFavoritesArr(currUserFavorites);
    setUser(updatedUser);
  }

  useEffect(() => {
    if (isFavoriteGame !== isFavorite) setIsFavorite(isFavorite);
    // setIsFavorite(isFavorite);
  }, [isFavorite])

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
          { user && authenticated
            ? <StyledRating
              name="customized-color"
              value={isFavoriteGame}
              getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
              max={1}
              controlled='true'
              icon={<FavoriteIcon fontSize="inherit" sx={{ fill: '#ff3d47', minWidth: '1.5rem', minHeight: '1.5rem', maxWidth: '2rem', maxHeight: '2rem', width: '1.5vw', height: '1.5vw' }} />}
              emptyIcon={<FavoriteBorderIcon fontSize="inherit" sx={{ fill: '#ff6d75', minWidth: '1.5rem', minHeight: '1.5rem', maxWidth: '2rem', maxHeight: '2rem', width: '1.5vw', height: '1.5vw' }} />}
              onChange={(event, newRating) => {
                handleOnFavoriteChange(newRating);
              }}
            /> 
            : <div className='game-rating subtext' style={{ color: '#fdca52'}}>{rating}</div>
          }
          
          
        </div>
      </div>
    </div>

  )
}

export default GameCard