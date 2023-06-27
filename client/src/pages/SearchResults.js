import '../styles/SearchResults.css'
import React from 'react'
import GameCard from '../components/GameCard'

const SearchResults = ({searchResults, user, authenticated}) => {
  return (
    <div className='search-results'>
      <h3 className='title'>Search results</h3>
      <div className='results-cont'>
          {searchResults.length > 0 && searchResults.map(searchResult => (
            <GameCard 
              key={searchResult.id} 
              id={searchResult.id} 
              title={searchResult.title} 
              image={searchResult.background_image} 
              price={searchResult.price} 
              rating={searchResult.rating} 
              user={user} 
              authenticated={authenticated}/>
          ))}
      </div>
    </div>
  )
}

export default SearchResults