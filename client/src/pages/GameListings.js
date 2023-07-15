import React from 'react'
import GameCard from '../components/GameCard'
import '../styles/GameListings.css'

const GameListings = ({user, authenticated, games, setUser, userFavorites, setUserFavorites}) => {
  return (
    <div className='games-library'>
      <div className='subtitle games-sub' >Browse our ever expanding game-verse</div>
      <div className='listings-cont'>
          { games?.length > 0 && games?.map((game) => {
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
          })}
      </div>
    </div>
  )
}

export default GameListings