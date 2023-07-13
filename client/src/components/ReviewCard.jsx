/* eslint-disable */
import React from 'react'
import { Card, CardContent, Typography, Rating } from '@mui/material'


const ReviewCard = ({review}) => {

  return (
    <Card sx={{ maxWidth: 345, mb: 2 }}>
      <CardContent>
        <Rating name="read-only" value={review.rating} readOnly />
        <Typography variant="body2" color="text.secondary">
          {review.content}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default ReviewCard