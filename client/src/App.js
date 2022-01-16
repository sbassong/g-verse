import './styles/App.css'
import './styles/JinHome.css'
import './styles/Sam.css'
import React, { useState, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
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
    localStorage.clear()
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
        <Switch>
          <Route exact path='/' component={() => <Homepage user={user} authenticated={authenticated}/>}  />
          <Route exact path='/signin' component={(props) => (<SignIn {...props} setUser={setUser} toggleAuthenticated={toggleAuthenticated}/>)} />
          <Route exact path='/signup' component={SignUp}/>
          <Route exact path='/search/results' component={() => <SearchResults searchResults={searchResults} user={user} authenticated={authenticated}/>}  />
          {user && authenticated && (<ProtectedRoute exact path='/user/account' component={Account} authenticated={authenticated} user={user} handleLogOut={handleLogOut}/>)}
          {user && authenticated && (<ProtectedRoute exact path='/cart' component={Cart} authenticated={authenticated} user={user} />)}
          <Route exact path='/games/listings' component={() => <GameListings user={user} authenticated={authenticated}/>} />
          <Route exact path='/about' component={About}/>
          {
            games.map(game => (
              <Route key={game.id} path={`/game/details/${game.id}`} component={() => <GameDetails game={game} user={user} authenticated={authenticated}/>} />
            ))
          }
          </Switch>
        </main>
    </div>
  )
}

export default App
