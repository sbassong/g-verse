import React, { useContext } from 'react'
import GameCard from '../components/GameCard'
import '../styles/GameListings.css'
import { UserContext } from '../utils';

const GameListings = ({ authenticated, games, setUser, userFavorites, setUserFavorites}) => {
  const authenticatedUser = useContext(UserContext);

  return (
    <div className='games-library'>
      <div className='subtitle games-sub' >Browse our ever expanding game-verse</div>
      <div className='listings-cont'>
          { games?.length > 0 && games?.map((game) => {
            let isFavorite;
            if (authenticatedUser?.favoriteGames?.length > 0 && authenticatedUser?.favoriteGames.includes(game.id)) isFavorite = 1;
            else isFavorite = 0;

            return (<GameCard
              key={game.id}
              id={game.id}
              name={game.name}
              image={game.backgroundImage}
              price={game.price}
              rating={game.rating}
              isFavorite={isFavorite}
              authenticated={authenticated}
              setUserFavorites={setUserFavorites}
              setUser={setUser}
            />)
          })}
      </div>
    </div>
  )
}

export default GameListings