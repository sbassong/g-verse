import React from 'react'
import GameCard from '../components/GameCard'


const GameListings = ({user, authenticated, games}) => {
  return (
    <div className='games'>
        {games.length > 0 && games.map((game) => (
          <GameCard key={game.id} id={game.id} title={game.title} image={game.background_image} price={game.price} rating={game.rating} user={user} authenticated={authenticated}/>
        ))}
    </div>
  )
}

export default GameListings