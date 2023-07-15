/* eslint-disable */
import '../../src/styles/GameDetails.css'
import React, { useEffect, useState } from "react"
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import Rating from '@mui/material/Rating';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { styled } from '@mui/material/styles';
import ReviewCard from "../components/ReviewCard";
import AddReview from '../components/AddReview';
import { GetReviewsByGameId } from "../services/ReviewServices";
import { UpdateUserFavorites } from '../services/UserServices';
import { Box, Typography } from '@mui/material';

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#ff6d75',
  },
  '& .MuiRating-iconHover': {
    color: '#ff3d47',
  },
});


const GameDetails = ({ game, user, authenticated, setUser, userFavorites, setUserFavorites, isFavorite}) => {
  const [isFavoriteGame, setIsFavorite] = useState(null);
  const [gameReviews, setGameReviews] = useState([]);
  const [isReviewForm, toggleReviewButton] = useState(false);

  const handleShowReviewForm = () => {
    isReviewForm ? toggleReviewButton(false) : toggleReviewButton(true);
  };

  const getReviews = async () => {
    const reviews = await GetReviewsByGameId(game.id);
    setGameReviews(reviews);
  };
  
  const updateUserFavoritesArr = async (data) => {
    if (!user) return;
    const updatedUser = await UpdateUserFavorites(user?.id, { favorites: data });
    return updatedUser;
  };

  const removeFavoriteId = (value, index, arr) => {
    if (value !== game?.id) return true;
    else return false;
  };
  
  const handleOnFavoriteChange = async (newRating) => {
    let currUserFavorites = userFavorites;
    
    if (newRating === 1) currUserFavorites?.push(game.id);
    else currUserFavorites = currUserFavorites?.filter(removeFavoriteId);

    setIsFavorite(newRating)
    setUserFavorites(currUserFavorites);
    const updatedUser = await updateUserFavoritesArr(currUserFavorites);
    setUser(updatedUser);
  };

  useEffect(() => {
    if (isFavoriteGame !== isFavorite) setIsFavorite(isFavorite);
    // setIsFavorite(isFavorite);
  }, [isFavorite]);
  
  useEffect(() => {
    getReviews();
  }, []);

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
                {game.rating}/10
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
          <div className='' >
            { user && authenticated && 
              <StyledRating
                name="customized-color"
                value={isFavoriteGame}
                getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                max={1}
                controlled='true'
                icon={<FavoriteIcon fontSize="inherit" />}
                emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                onChange={(event, newRating) => {
                  handleOnFavoriteChange(newRating);
                }}
            />}
          </div>
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
        <Box 
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            ml: 2,
          }}
        >
          <Typography
            variant="h5"
            underlined='true'
            color='white'
            sx={{
              mb: 2,
            }}
          >
            Reviews 
          </Typography>

          <span onClick={handleShowReviewForm}>
            <AddBoxIcon sx={{ width: '1.5rem', height: '1.5rem', mr: 1,}}/> 
            Add Review
          </span>
          <Box sx={{mb: 3,}}>
            {isReviewForm && <AddReview user={user} game={game} setGameReviews={setGameReviews} gameReviews={gameReviews}/>}
          </Box>
          
          {gameReviews.length > 0
            ? gameReviews?.map((review) => <ReviewCard key={review.id} review={review}/>)
            : <Typography variant="body2" color='rgb(190, 190, 190)'>Be the first to leave a review!</Typography>
          }
        </Box>
      </Box>
      
    </div>
  )
}

export default GameDetails