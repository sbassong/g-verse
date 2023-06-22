/* eslint-disable */
import React from 'react';
import { Carousel } from 'react-bootstrap';

const CarouselItem = () => {

  return (
    <Carousel
      style={{
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '50%',
        marginTop: '1em'
      }}
      fade
    >
      <Carousel.Item>
        <img
          id="image"
          className="d-block w-100"
          src="https://i.imgur.com/JoZ2QRl.jpg"
          alt="fifa"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          id="image"
          className="d-block w-100"
          src="https://i.imgur.com/MjVxbqn.jpg"
          alt="fortnite"
        />

        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          id="image"
          className="d-block w-100"
          src="https://i.imgur.com/WieQ8iy.jpg"
          alt="pubg"
        />
      </Carousel.Item>
    </Carousel>
  )
}

export default CarouselItem