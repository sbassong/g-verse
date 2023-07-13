import React, {useState} from 'react';
import { NavLink } from 'react-router-dom'
import { CreateReview } from '../services/ReviewServices'
import '../styles/SignIn.css'
import { ThemeProvider } from '@mui/material/styles';
import CustomizedInputsStyleOverrides from '../styles/muiOverrides';
import { Rating, Button, TextField, Box, Typography, Container} from '@mui/material'


const AddReview = (props) => {
  const [content, setContent] = useState('')
  const [rating, setRating] = useState(0);
  // const [formValues, setFormValues] = useState({ user_id: user.id, game_id: game.id, content: '' })


  const handleFormChange = (e) => setContent(e.target.value );

  const handleSubmit = async (e) => {
    e.preventDefault()
    CreateReview({content: content ? content : 'No content', rating})
    setRating(0);
    setContent('');
  }
  

  return (
    <ThemeProvider theme={CustomizedInputsStyleOverrides}>

      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            padding: 2,
            marginTop: 6,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: 1,
          }}
        >          
          <Typography component="h1" variant="h5">
            Leave a review
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>

          <Typography component="legend" sx={{ mb: 0 }}>Rating</Typography>
            <Rating
              name="simple-controlled"
              required
              value={rating}
              onChange={(event, newRating) => {
                setRating(newRating);
              }}
              sx={{ mt: 1, mb: 4, }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="content"
              label="review"
              name="content"
              placeholder="What a game!"
              value={content}
              variant="filled"
              multiline
              rows={3}
              onChange={handleFormChange}
              autoFocus
              sx={{
                borderRadius: 1,
                mb: 4,
                mt: 1,
                backgroundColor: 'rgba(225, 225, 225)',
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 1, backgroundColor: '#2dc14f' }}
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