import '../styles/SearchResults.css'
import React, { useContext } from 'react'
import GameCard from '../components/GameCard'
import { UserContext } from '../utils';


const SearchResults = ({searchResults, user, authenticated, setUser, setUserFavorites}) => {
  const authenticatedUser = useContext(UserContext);
  
  return (
    <div className='search-results'>
      <h3 className='title'>Search results</h3>
      <div className='results-cont'>
        { searchResults?.length > 0
          ? searchResults?.map((game) => {
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
            />)})
          : <div className='no-games'>Oops, no matches found.</div>
        }
      </div>
    </div>
  )
}

export default SearchResults