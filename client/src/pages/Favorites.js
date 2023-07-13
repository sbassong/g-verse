import React, {useEffect} from 'react'
import GameCard from '../components/GameCard'
import '../styles/GameListings.css'

const Favorites = ({user, authenticated, favoriteItems}) => {
  const noItems = (
    <h2 className="subtitle">No favorites games? checkout out the game-verse</h2>
  )

  useEffect(() => {
  }, [favoriteItems])

  return (
    <div className='games-library'>
      {favoriteItems.length > 0 && <div className='subtitle games-sub' >Your favorite games</div>}
      <div className='listings-cont'>
          {favoriteItems.length > 0 
            ? favoriteItems.map((favoriteItem) => (
            <GameCard
              favorite
              key={favoriteItem?.id} 
              id={favoriteItem?.id} 
              title={favoriteItem?.title} 
              image={favoriteItem?.background_image} 
              price={favoriteItem?.price} 
              rating={favoriteItem?.rating} 
              user={user} 
              authenticated={authenticated}/>
          ))
          : noItems
        }
      </div>
    </div>
  )
}

export default Favorites