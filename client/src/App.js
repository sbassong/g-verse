// import './styles/App.css'
// import './styles/JinHome.css'
import './styles/Sam.css'
import React, { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { CheckSession } from './services/UserServices'
import { GetGames } from './services/GameServices'

import Nav from './components/Nav'
import ProtectedRoute from './components/ProtectedRoute';

import Account from './pages/Account'
import Homepage from './pages/Homepage'
import GameDetails from './pages/GameDetails'
import GameListings from './pages/GameListings'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import SearchResults from './pages/SearchResults'
import Cart from './pages/Cart'
import About from './pages/About'



function App() {
  const [authenticated, toggleAuthenticated] = useState(false || localStorage.getItem('authenticated'))
  const [user, setUser] = useState(null)

  const [searchResults, setSearchResults] = useState([])
  const [games, setGames] = useState([])

  const GetAllGames = async () => {
    const res = await GetGames()
    setGames(res)
  }

  const handleLogOut = () => {
    setUser(null)
    toggleAuthenticated(false)
    localStorage.getItem('authenticated').clear()
  }

  const checkToken = async () => {
    const session = await CheckSession()
    setUser(session)
    toggleAuthenticated(true)
    localStorage.setItem('authenticated', '1')
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      checkToken()
    }
    GetAllGames()
  }, [])

  return (
    <div className="App">
      <Nav authenticated={authenticated} user={user} handleLogOut={handleLogOut} setSearchResults={setSearchResults} />
      
      <main>
        <Routes>
          <Route exact path='/' element={<Homepage user={user} authenticated={authenticated}/>}  />
          <Route exact path='/signin' element={(props) => (<SignIn {...props} setUser={setUser} toggleAuthenticated={toggleAuthenticated}/>)} />
          <Route exact path='/signup' element={SignUp}/>
          <Route exact path='/search/results' element={<SearchResults searchResults={searchResults} user={user} authenticated={authenticated} />}  />
          {user && authenticated && (<ProtectedRoute exact path='/user/account' element={Account} authenticated={authenticated} user={user} handleLogOut={handleLogOut}/>)}
          {user && authenticated && (<ProtectedRoute exact path='/cart' element={Cart} authenticated={authenticated} user={user} />)}
          <Route exact path='/games/listings' element={<GameListings user={user} authenticated={authenticated} games={games} GetAllGames={GetAllGames}/>} />
          <Route exact path='/about' element={About}/>
          {
            games.length > 0 && games.map(game => (
              <Route key={game.id} path={`/game/details/${game.id}`} element={<GameDetails game={game} user={user} authenticated={authenticated} />} />
            ))
          }
          </Routes>
        </main>
    </div>
  )
}

export default App
