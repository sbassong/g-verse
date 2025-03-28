import React, { useEffect, useContext } from 'react'
import GameCard from '../components/GameCard'
import { Box  } from '@mui/material';
import { UserContext } from '../utils';


const Favorites = ({ games, userFavorites, setUser, setUserFavorites}) => {
  const authenticatedUser = useContext(UserContext);
  const noItems = (
    <h2 className="subtitle">No favorites games? checkout out the game-verse</h2>
  )

  useEffect(() => {
  }, [games])

  return (
    <Box 
      className='favorite-games-container'
      sx={{mt: 3, display: 'flex', flexWrap: 'wrap'}}
    >
      { games?.length > 0
        ? games?.map((game) => {
          let isFavorite;
          if (userFavorites?.length > 0 && userFavorites.includes(game.id)) {
            isFavorite = 1;
            return (<GameCard
              key={game.id}
              id={game.id}
              name={game.name}
              image={game.backgroundImage}
              price={game.price}
              rating={game.rating}
              isFavorite={isFavorite}
              userFavorites={userFavorites}
              setUserFavorites={setUserFavorites}
              setUser={setUser}
            />)
          } else return '';
        }) 
        : noItems
      }
    </Box>
  )
}

export default Favorites