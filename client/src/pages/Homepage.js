import React, { useState, useEffect } from 'react'
import GameCard from '../components/GameCard'
import { GetPopularGames, GetRecentGames } from '../services/GameServices'
import { Carousel } from 'react-bootstrap'
import '../styles/JinHome.css'

const Homepage = ({ user, authenticated}) => {
  const [recentGames, setRecentGames] = useState([])
  const [popularGames, setPopularGames] = useState([])

  const showRecentGames = async () => {
    const res = await GetRecentGames()
    setRecentGames(res)
  }

  const showPopularGames = async () => {
    const res = await GetPopularGames()
    setPopularGames(res)
  }

  useEffect(() => {
    showRecentGames()
    showPopularGames()
  }, [])

  return (
    <div className="homepage">
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

      <section className="home-cont" >
        <div className="home-games">
          <section className="popular-games">
            <h1>Top Rated Games:</h1>
            <div className='games-cont'>
              {popularGames &&
              popularGames.map((game) => (
                <GameCard
                  key={game.id}
                  id={game.id}
                  title={game.title}
                  image={game.background_image}
                  price={game.price}
                  rating={game.rating}
                  user={user}
                  authenticated={authenticated}
                />
              ))}
            </div>
          </section>

          <section className="recent-games">
            <h1>Recently Added Games:</h1>
            <div className='games-cont'>
              {recentGames &&
              recentGames.map((game) => (
                <GameCard
                  key={game.id}
                  id={game.id}
                  title={game.title}
                  image={game.background_image}
                  price={game.price}
                  rating={game.rating}
                  user={user}
                  authenticated={authenticated}
                />
              ))}
            </div>
            
          </section>
        </div>
      </section>
    </div>
  )
}

export default Homepage
