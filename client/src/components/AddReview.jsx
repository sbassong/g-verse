import "../styles/SignIn.css";
import React, { useContext, useState } from "react";
import { CreateReview } from "../services/ReviewServices";
import {
  Rating,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { UserContext } from "../utils";

const customRatingStyles = {
  mt: 2,
  mb: 1,
  "& .MuiRating-iconFilled": {
    color: "#faaf00",
  },
  "& .MuiRating-iconHover": {
    color: "#faaf00",
  },
};

const AddReview = ({
  game,
  setGameReviews,
  gameReviews,
  handleSnack,
  reviewDialogOpen,
  handleHideReviewForm,
}) => {
  const authenticatedUser = useContext(UserContext);
  const [formData, setFormData] = useState({
    content: "",
    userRating: 0,
  });

  const handleFormChange = (e, newRating) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.name === "userRating" ? newRating : e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.userRating === 0)
      handleSnack("Error: please give a rating", "error");
    else if (!formData.content)
      handleSnack("Error: please add a comment", "error");
    else if (formData.userRating > 0 && formData.content) {
      console.log(authenticatedUser);
      const createdReview = await CreateReview({
        content: formData.content,
        userRating: formData.userRating,
        gameId: game?.id,
        userId: authenticatedUser?.id,
      });

      if (createdReview?.id) {
        const updatedGameReviews = gameReviews;
        updatedGameReviews.push(createdReview);
        setGameReviews(updatedGameReviews);
        setFormData({ content: "", userRating: 0 });
        handleHideReviewForm();
        handleSnack("Success: Thank you for your review!", "success");
      } else {
        handleSnack(createdReview?.message, "error");
      }
    }
  };

  return (
    <Dialog open={reviewDialogOpen} onClose={handleHideReviewForm}>
      <DialogTitle sx={{ color: "black", m: 1, mb: 0 }}>
        Leave a review
      </DialogTitle>
      <DialogContent sx={{ color: "black", mr: 1, ml: 1 }}>
        <DialogContentText>
          Please rate the game and leave a comment
        </DialogContentText>
        <Rating
          name="userRating"
          className="review-rating"
          required
          value={formData.userRating}
          onChange={handleFormChange}
          sx={customRatingStyles}
        />

        <TextField
          margin="normal"
          fullWidth
          id="content"
          label="comments"
          name="content"
          placeholder="What a game!"
          value={formData.content}
          multiline
          rows={3}
          onChange={handleFormChange}
          autoFocus
          sx={{
            borderRadius: 1,
            mb: 0,
            mt: 1,
            backgroundColor: "rgba(225, 225, 225, .5)",
            input: { color: "white" },
          }}
        />
      </DialogContent>
      <DialogActions sx={{ mb: 1, mr: 2, ml: 2 }}>
        <Button
          sx={{ backgroundColor: "grey" }}
          variant="contained"
          onClick={handleHideReviewForm}
        >
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSubmit} autoFocus>
          Review
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddReview;
