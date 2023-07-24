/* eslint-disable react-hooks/exhaustive-deps */
import './styles/App.css'

import React, { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
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
  const [user, setUser] = useState(null);
  const [authenticated, toggleAuthenticated] = useState(false || localStorage.getItem('authenticated'));
  const [games, setGames] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [userFavorites, setUserFavorites] = useState([]);
  
  const GetAllGames = async () => {
    const games = await GetGames();
    setGames(games);
  };

  const checkToken = async () => {
    const userSession = await CheckSession();
    if (userSession?.email){
      setUserFavorites(userSession?.favorites);
      localStorage.setItem('authenticated', '1');
      setUser(userSession);
      toggleAuthenticated(true);
    } else console.log(userSession)
    return
  };

  const handleLogOut =  () => {
    setUser(null);
    toggleAuthenticated(false);
    localStorage.removeItem('authenticated');
    localStorage.removeItem('token');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) checkToken();
    if (!games.length > 0) GetAllGames();
  }, []);


  return (
    <div className="App">
      <Nav authenticated={authenticated} user={user} handleLogOut={handleLogOut} setSearchResults={setSearchResults} />
      
      <main className='main-section'>
        <Routes>
          <Route exact path='/' element={<Homepage user={user} setUser={setUser} authenticated={authenticated} userFavorites={userFavorites} setUserFavorites={setUserFavorites}/>}  />
          <Route exact path='/signin' element={<SignIn user={user} authenticated={authenticated} setUser={setUser} toggleAuthenticated={toggleAuthenticated}/>} />
          <Route exact path='/signup' element={<SignUp />}/>
          <Route exact path='/library/games' element={<GameListings user={user} setUser={setUser} authenticated={authenticated} games={games} GetAllGames={GetAllGames} userFavorites={userFavorites} setUserFavorites={setUserFavorites}/>} />
          <Route exact path='/games/search/results' element={<SearchResults  setUser={setUser} searchResults={searchResults} user={user} authenticated={authenticated} userFavorites={userFavorites} setUserFavorites={setUserFavorites}/>}  />
          <Route exact path='/user/account' element={<Account authenticated={authenticated} games={games} user={user} setUser={setUser} toggleAuthenticated={toggleAuthenticated} handleLogOut={handleLogOut} userFavorites={userFavorites} setUserFavorites={setUserFavorites}/>} />
          { games.length > 0 && games.map(game => {
            let isFavorite;
            if (userFavorites?.length > 0 && userFavorites.includes(game?.id)) isFavorite = 1;
            else isFavorite = 0;

            return <Route key={game.id} path={`/game/details/${game?.id}`} element={<GameDetails game={game} user={user} setUser={setUser} authenticated={authenticated} userFavorites={userFavorites} isFavorite={isFavorite} setUserFavorites={setUserFavorites}/>} />
          })}
        </Routes>
      </main>
    </div>
  )
}

export default App;
