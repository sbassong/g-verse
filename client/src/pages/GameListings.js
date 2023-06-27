import React from 'react'
import GameCard from '../components/GameCard'
import '../styles/GameListings.css'

const GameListings = ({user, authenticated, games}) => {
  return (
    <div className='games-library'>
      <div className='subtitle' >Browse our ever expanding game-verse</div>
      <div className='listings-cont'>
          {games.length > 0 && games.map((game) => (
            <GameCard 
              key={game.id} 
              id={game.id} 
              title={game.title} 
              image={game.background_image} 
              price={game.price} 
              rating={game.rating} 
              user={user} 
              authenticated={authenticated}/>
          ))}
      </div>
    </div>
  )
}

export default GameListings