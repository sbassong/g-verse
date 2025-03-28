import React, { useState, useEffect, useContext } from 'react'
import GameCard from '../components/GameCard'
import { GetPopularGames, GetRecentGames } from '../services/GameServices'
import '../styles/Homepage.css'
import { UserContext } from '../utils';


const Homepage = ({ authenticated, setUser, setUserFavorites}) => {
  const authenticatedUser = useContext(UserContext);
  const [recentGames, setRecentGames] = useState([]);
  const [popularGames, setPopularGames] = useState([]);

  const showRecentGames = async () => {
    const res = await GetRecentGames();
    setRecentGames(res);
  };

  const showPopularGames = async () => {
    const res = await GetPopularGames();
    setPopularGames(res);
  };

  useEffect(() => {
    showRecentGames();
    showPopularGames();
  }, []);

  return (
    <div className="homepage">
      <h1 className='title'>Top Games</h1>
      <div className='games-cont'>
        {popularGames && popularGames.map((game) => {
          let isFavorite;
          if (authenticatedUser?.favoriteGames?.length > 0 && authenticatedUser?.favoriteGames.includes(game?.id)) isFavorite = 1;
          else isFavorite = 0;

          return (<GameCard
            key={game?.id}
            id={game?.id}
            name={game.name}
            image={game.backgroundImage}
            price={game.price}
            rating={game.rating}
            isFavorite={isFavorite}
            authenticated={authenticated}
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
          if (authenticatedUser?.favoriteGames?.length > 0 && authenticatedUser?.favoriteGames.includes(game?.id)) isFavorite = 1;
          else isFavorite = 0;

          return (
            <GameCard
              key={game.id}
              id={game.id}
              name={game.name}
              image={game.backgroundImage}
              price={game.price}
              rating={game.rating}
              user={authenticatedUser}
              isFavorite={isFavorite}
              authenticated={authenticated}
              setUserFavorites={setUserFavorites}
              setUser={setUser}
            />
          )
        })
      }
      </div>
    </div>
  )
}

export default Homepage
