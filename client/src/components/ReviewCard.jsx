/* eslint-disable */
import React from 'react'
import { Card, CardContent, Typography, Rating } from '@mui/material'


const ReviewCard = ({review}) => {
  return (
    <Card 
      sx={{ 
        maxWidth: 700,
        mb: 3,
        backgroundColor: 'transparent',
        borderBottom: '1px inset rgba(225, 225, 225, .2)',
        borderLeft: '1px inset rgba(225, 225, 225, .2)',
        width: '100%',
      }}
    >
      <CardContent>
        <Rating name="read-only" value={review.rating} readOnly />
        <Typography
          variant="body2"
          color="rgba(225, 225, 225, .9)"
          sx={{
            maxWidth: 675,
            mt: 1,
          }}
        >
          {review.content}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default ReviewCard;