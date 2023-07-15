import '../styles/SearchResults.css'
import React from 'react'
import GameCard from '../components/GameCard'

const SearchResults = ({searchResults, user, authenticated, userFavorites, setUser, setUserFavorites}) => {
  return (
    <div className='search-results'>
      <h3 className='title'>Search results</h3>
      <div className='results-cont'>
        { searchResults?.length > 0
          ? searchResults?.map((game) => {
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
            />)})
          : <div className='no-games'>Oops, no matches found.</div>
        }
      </div>
    </div>
  )
}

export default SearchResults