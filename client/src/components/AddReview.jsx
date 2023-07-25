import React, {useState} from 'react';
import { CreateReview } from '../services/ReviewServices'
import '../styles/SignIn.css'
import { Rating, Button, TextField, Dialog, DialogActions, DialogContentText, DialogContent, DialogTitle } from '@mui/material'

const customRatingStyles = {
  mt: 2, 
  mb: 1,
  "& .MuiRating-iconFilled": {
    color: "#faaf00",
  },
  "& .MuiRating-iconHover": {
    color: "#faaf00"
  },
};


const AddReview = ({ game, setGameReviews, gameReviews, handleShowReviewForm, handleSnack, reviewDialogOpen, handleHideReviewForm }) => {
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(0);

  const handleContentChange = (e) => setContent(e.target.value );
  const handleRatingChange = (e, newRating) => setRating(newRating);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (rating === 0) {
      const errorMsg = 'Error: Missing rating';
      handleSnack(errorMsg, 'error');
    } else if (!content) {
      const errorMsg = 'Error: Missing comments';
      handleSnack(errorMsg, 'error');
    } else if (rating > 0 && content) {
      const newReview = await CreateReview({
        content: content ? content : 'No content',
        rating,
        game_id: game?.id,
      });
      
      if (newReview?.id) {
        const successMsg = 'Success: Thank you for your review!';
        const updatedGameReviews = gameReviews;

        updatedGameReviews.push(newReview);
        setGameReviews(updatedGameReviews);
        setRating(0);
        setContent('');
        handleHideReviewForm()
        handleSnack(successMsg, 'success');
      } else {
        handleSnack(newReview?.message, 'error');
      }
    }
    return;
  };
  
  return (
    <Dialog open={reviewDialogOpen} onClose={handleHideReviewForm}>
      <DialogTitle sx={{ color: 'black', m: 1, mb: 0 }}>Leave a review</DialogTitle>
      <DialogContent
        sx={{ color: 'black', mr: 1, ml: 1 }}
      >
        <DialogContentText>
          Please rate the game and leave a comment
        </DialogContentText>
        <Rating
          name="simple-controlled"
          className='review-rating'
          required
          value={rating}
          onChange={handleRatingChange}
          sx={customRatingStyles}
        />

        <TextField
          margin="normal"
          fullWidth
          id="content"
          label="comments"
          name="content"
          placeholder="What a game!"
          value={content}
          multiline
          rows={3}
          onChange={handleContentChange}
          autoFocus
          sx={{
            borderRadius: 1,
            mb: 0,
            mt: 1,
            backgroundColor: 'rgba(225, 225, 225, .5)',
            input: { color: 'white' },
          }}
        />
      </DialogContent>
      <DialogActions
        sx={{ mb: 1, mr: 2, ml: 2 }}
      >
        <Button sx={{ backgroundColor: 'grey' }} variant="contained" onClick={handleHideReviewForm}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit} autoFocus>Review</Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddReview;