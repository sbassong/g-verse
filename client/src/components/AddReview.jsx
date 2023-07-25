import React, {useState} from 'react';
import { CreateReview } from '../services/ReviewServices'
import '../styles/SignIn.css'
import { ThemeProvider } from '@mui/material/styles';
import CustomizedInputsStyleOverrides from '../styles/muiOverrides';
import { Rating, Button, TextField, Box, Typography, Container} from '@mui/material'


const AddReview = ({game, setGameReviews, gameReviews, handleShowReviewForm, handleSnack}) => {
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
        const updatedGameReviews = gameReviews;
        updatedGameReviews.push(newReview);
        setGameReviews(updatedGameReviews);
        setRating(0);
        setContent('');
        handleShowReviewForm();
        const successMsg = 'Success: Thank you for your review!';
        handleSnack(successMsg, 'success');
      } else {
        handleSnack(newReview?.message, 'error');
      }
    }
    return;
  };
  
  return (
    <ThemeProvider theme={CustomizedInputsStyleOverrides}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            padding: 1,
            marginTop: 6,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 1,
          }}
        >          
          <Typography component="h4" variant="h6">
            Leave a review
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>

            {/* <Typography component="legend" sx={{ mb: 0 }}>Rating</Typography> */}
            <Rating
              name="simple-controlled"
              required
              value={rating}
              onChange={handleRatingChange}
              sx={{ mt: 1, mb: 3, }}
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
                mb: 4,
                mt: 1,
                backgroundColor: 'rgba(225, 225, 225, .5)',
                input: { color: 'white' },
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ margin: 'auto', mt: 1, mb: 1, backgroundColor: '#2dc14f' }}
            >
              Add review
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default AddReview;