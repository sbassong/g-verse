import React, { useState, useEffect } from 'react'
import GameCard from '../components/GameCard'
import { GetPopularGames, GetRecentGames } from '../services/GameServices'
import '../styles/Homepage.css'

const Homepage = ({ user, authenticated, userFavorites, setUser, setUserFavorites}) => {
  const [recentGames, setRecentGames] = useState([]);
  const [popularGames, setPopularGames] = useState([]);

  const showRecentGames = async () => {
    const res = await GetRecentGames();
    setRecentGames(res);
  }

  const showPopularGames = async () => {
    const res = await GetPopularGames();
    setPopularGames(res);
  }

  useEffect(() => {
    showRecentGames();
    showPopularGames();
  }, [])

  return (
    <div className="homepage">
      <h1 className='title'>Top Games</h1>
      <div className='games-cont'>
        {popularGames && popularGames.map((game) => {
          let isFavorite;
          if (userFavorites?.length > 0 && userFavorites.includes(game.id)) isFavorite = 1;
          else isFavorite = 0;

          return (<GameCard
            key={game.id}
            id={game.id}
            title={game.title}
            image={game.background_image}
            price={game.price}
            rating={game.rating}
            user={user}
            isFavorite={isFavorite}
            authenticated={authenticated}
            userFavorites={userFavorites}
            setUserFavorites={setUserFavorites}
            setUser={setUser}
          />)
        })
      }
      </div>

      <h1 className='title'>Latest Games</h1>
      <div className='games-cont'>
        {recentGames && recentGames.map((game) => {
          let isFavorite;
          if (userFavorites?.length > 0 && userFavorites.includes(game.id)) isFavorite = 1;
          else isFavorite = 0;

          return (<GameCard
            key={game.id}
            id={game.id}
            title={game.title}
            image={game.background_image}
            price={game.price}
            rating={game.rating}
            user={user}
            isFavorite={isFavorite}
            authenticated={authenticated}
            userFavorites={userFavorites}
            setUserFavorites={setUserFavorites}
            setUser={setUser}
          />)
        })
      }
      </div>
    </div>
  )
}

export default Homepage
