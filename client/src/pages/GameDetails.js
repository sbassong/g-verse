/* eslint-disable */
import '../../src/styles/GameDetails.css'
import React, { useEffect, useState } from "react"
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import Rating from '@mui/material/Rating';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert'
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

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const GameDetails = ({ game, user, authenticated, setUser, userFavorites, setUserFavorites, isFavorite}) => {
  const [isFavoriteGame, setIsFavorite] = useState(null);
  // const [reviewUpdated, toggleReviewUpdated] = useState(false)
  const [gameReviews, setGameReviews] = useState([]);
  const [isReviewForm, toggleReviewButton] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState(null);
  const [snackSeverity,  setSnackSeverity] = useState(null);
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);

  const handleShowReviewForm = () => setReviewDialogOpen(true);
  const handleHideReviewForm = () => setReviewDialogOpen(false);
  

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

  const handleShowSnack = () => setSnackOpen(true);

  const handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackOpen(false);
  };

  const handleSnack = (message, severity) => {
    setSnackMessage(message);
    setSnackSeverity(severity);
    handleShowSnack();
  };

  useEffect(() => {
    if (isFavoriteGame !== isFavorite) setIsFavorite(isFavorite);
  }, [isFavorite]);
  
  useEffect(() => {
    getReviews();
  }, []);

  return (
    <div className='game-details'>
      <Box className='top-half'>
        <img className='img-div' src={game.background_image} alt={`${game.title} poster`} />
      
        <div className='right-side'>
          <div 
            className='title' 
            style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}
          >
            {game.title} 
      
            { user && authenticated && 
              <StyledRating
                name="customized-color"
                value={isFavoriteGame}
                getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                max={1}
                controlled='true'
                icon={<FavoriteIcon fontSize="inherit" sx={{fill: '#ff3d47', minWidth: '1.5rem', minHeight: '1.5rem', maxWidth: '2.5rem', maxHeight: '2.5rem', width: '2vw', height: '2vw'}}/>}
                emptyIcon={<FavoriteBorderIcon fontSize="inherit" sx={{fill: '#ff6d75', minWidth: '1.5rem', minHeight: '1.5rem', maxWidth: '2.5rem', maxHeight: '2.5rem', width: '2vw', height: '2vw'}}/>}
                onChange={(event, newRating) => {
                  handleOnFavoriteChange(newRating);
                }}
                sx={{ml: 2, mr: 2}}
            />}
          </div>
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
          <br/>
        </div>
      </Box>

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
          sx={{ mb: 3, display: 'flex',  alignItems: 'center', justifyContent: 'space-between'}}
        >
          Reviews 
          <Box onClick={handleShowReviewForm} sx={{display: 'flex',  alignItems: 'center', color: 'grey.600'}}>
            <AddBoxIcon sx={{ width: 20, height: 20, mr: .5, ml: 2}}/> 
            Add Review
          </Box>
        </Typography>

        
        {gameReviews.length > 0
          ? gameReviews?.map((review) => <ReviewCard key={review.id} review={review}/>)
          : <Typography variant="body2" color='rgb(190, 190, 190)'>Be the first to leave a review!</Typography>
        }
      </Box>
      
      <Snackbar
        open={snackOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnack}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnack}
          severity={snackSeverity}
          sx={{ width: '100%' }}
        >
          {snackMessage}
        </Alert>
      </Snackbar>
      
      <AddReview
        user={user}
        game={game}
        setGameReviews={setGameReviews}
        gameReviews={gameReviews}
        handleShowReviewForm={handleShowReviewForm}
        handleHideReviewForm={handleHideReviewForm}
        reviewDialogOpen={reviewDialogOpen}
        handleSnack={handleSnack}
      />

    </div>
  )
}

export default GameDetails