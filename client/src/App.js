import './styles/App.css'

import React, { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useNavigate } from "react-router";
import { CheckSession } from './services/UserServices'
import { GetGames } from './services/GameServices'

import Nav from './components/Nav'
import Account from './pages/Account'
import Homepage from './pages/Homepage'
import GameDetails from './pages/GameDetails'
import GameListings from './pages/GameListings'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import SearchResults from './pages/SearchResults'


function App() {
  const navigate = useNavigate()
  const [authenticated, toggleAuthenticated] = useState(false || localStorage.getItem('authenticated'))
  const [user, setUser] = useState(null)

  const [searchResults, setSearchResults] = useState([])
  const [games, setGames] = useState([])

  const GetAllGames = async () => {
    const res = await GetGames()
    setGames(res)
  }

  const handleLogOut =  () => {
    setUser(null)
    toggleAuthenticated(false)
    localStorage.removeItem('authenticated')
    localStorage.removeItem('token')
    // navigate('/signin')
  }

  const checkToken = async () => {
    const session = await CheckSession()
    setUser(session)
    toggleAuthenticated(true)
    localStorage.setItem('authenticated', '1')
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) checkToken();
    GetAllGames();
  }, [])

  return (
    <div className="App">
      <Nav authenticated={authenticated} user={user} handleLogOut={handleLogOut} setSearchResults={setSearchResults} />
      
      <main className='main-section'>
        <Routes>
          <Route exact path='/' element={<Homepage user={user} authenticated={authenticated}/>}  />
          <Route exact path='/signin' element={<SignIn user={user} authenticated={authenticated} setUser={setUser} toggleAuthenticated={toggleAuthenticated}/>} />
          <Route exact path='/signup' element={<SignUp />}/>
          <Route exact path='/library/games' element={<GameListings user={user} authenticated={authenticated} games={games} GetAllGames={GetAllGames}/>} />
          <Route exact path='/search/results' element={<SearchResults searchResults={searchResults} user={user} authenticated={authenticated} />}  />
          <Route exact path='/user/account' element={<Account authenticated={authenticated} user={user} setUser={setUser} toggleAuthenticated={toggleAuthenticated} handleLogOut={handleLogOut}/>} />
          { games.length > 0 && games.map(game => (
            <Route key={game.id} path={`/game/details/${game.id}`} element={<GameDetails game={game} user={user} authenticated={authenticated} />} />
          ))}
        </Routes>
      </main>
    </div>
  )
}

export default App;
