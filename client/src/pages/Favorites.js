import React, {useEffect} from 'react'
import GameCard from '../components/GameCard'
import { Box  } from '@mui/material';

const Favorites = ({user, authenticated, games, userFavorites, setUser, setUserFavorites}) => {
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
          } else return '';
        }) 
        : noItems
      }
    </Box>
  )
}

export default Favorites