import React, { useEffect, useState } from "react";
import GameCard from '../components/GameCard'
import {GetGames} from '../services/GameServices'

const GameListings = ({user, authenticated}) => {
  const [games, setGames] = useState([])

  const showGames = async () => {
    const res = await GetGames()
    setGames(res)
  }
  
  useEffect(() => {
    showGames()
  }, [])
  
  return (
    <div className='games'>
        {games.length > 0 && games.map((game) => (
          <GameCard key={game.id} id={game.id} title={game.title} image={game.background_image} price={game.price} rating={game.rating} user={user} authenticated={authenticated}/>
        ))}
      
    </div>
  )
}

export default GameListings