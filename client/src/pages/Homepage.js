import React, { useState, useEffect } from 'react'
import GameCard from '../components/GameCard'
import { GetPopularGames, GetRecentGames } from '../services/GameServices'
import '../styles/Homepage.css'

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
      <h1 className='title'>Top Games</h1>
      <div className='games-cont'>
        {popularGames && popularGames.map((game) => (
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

      <h1 className='title'>Latest Games</h1>
      <div className='games-cont'>
        {recentGames && recentGames.map((game) => (
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
    </div>
  )
}

export default Homepage
