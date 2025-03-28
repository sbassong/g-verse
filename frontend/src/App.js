/* eslint-disable react-hooks/exhaustive-deps */
import './styles/App.css';
import React, { useState, useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useNavigate } from "react-router";
import { CheckSession, SignOut } from './services/UserServices';
import { GetGames } from './services/GameServices';
import Nav from './components/Nav';
import Account from './pages/Account';
import Homepage from './pages/Homepage';
import GameDetails from './pages/GameDetails';
import GameListings from './pages/GameListings';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import SearchResults from './pages/SearchResults';
import { UserContext } from './utils';


function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [authenticated, toggleAuthenticated] = useState(false || localStorage.getItem('gverse-authenticated'));
  const [games, setGames] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [userFavorites, setUserFavorites] = useState([]);

  const GetAllGames = async () => {
    const games = await GetGames();
    setGames(games);
  };

  // const filterFavoriteGames = () => {

  //   const favoriteGames = []
  //   user?.favoriteGames.forEach((gameId) => {
  //     if gameId
  //   })
  // }

  const checkToken = async () => {
    const userSession = await CheckSession();
    if (userSession?.isAuthenticated) {
      setUserFavorites(userSession?.favoriteGames);
      localStorage.setItem('gverse-authenticated', 1);
      setUser(userSession);


      toggleAuthenticated(true);
    } else return;
  };

  const handleLogOut = async () => {
    localStorage.removeItem('gverse-token');
    localStorage.setItem('gverse-authenticated', 0);
    setUser(null);
    toggleAuthenticated(false);
    await SignOut({ id: user.id });
    navigate('/');
  };

  useEffect(() => {
    const token = localStorage.getItem('gverse-token');
    if (token) checkToken();
    if (!games.length) GetAllGames();
  }, []);


  return (
    <UserContext.Provider value={user}>
      <div className="App">
        <Nav authenticated={authenticated} handleLogOut={handleLogOut} setSearchResults={setSearchResults} />

        <main className='main-section'>
          <Routes>
            <Route exact path='/' element={<Homepage setUser={setUser} authenticated={authenticated} userFavorites={userFavorites} setUserFavorites={setUserFavorites} />} />
            <Route exact path='/signin' element={<SignIn authenticated={authenticated} setUser={setUser} toggleAuthenticated={toggleAuthenticated} />} />
            <Route exact path='/signup' element={<SignUp />} />
            <Route exact path='/games' element={<GameListings setUser={setUser} authenticated={authenticated} games={games} GetAllGames={GetAllGames} userFavorites={userFavorites} setUserFavorites={setUserFavorites} />} />
            <Route exact path='/games/search' element={<SearchResults setUser={setUser} searchResults={searchResults} authenticated={authenticated} userFavorites={userFavorites} setUserFavorites={setUserFavorites} />} />
            <Route exact path={`/user/${user?.id}/profile`} element={user ? <Account authenticated={authenticated} games={games} setUser={setUser} toggleAuthenticated={toggleAuthenticated} handleLogOut={handleLogOut} userFavorites={userFavorites} setUserFavorites={setUserFavorites} /> : <Navigate to="/" state={{ from: location }} replace />} />
            {games.length > 0 && games.map(game => {
              let isFavorite;
              userFavorites?.length > 0 && userFavorites.includes(game?.id) ? isFavorite = 1 : isFavorite = 0;
              return <Route key={game.id} path={`/games/${game?.id}/details`} element={<GameDetails game={game} setUser={setUser} authenticated={authenticated} userFavorites={userFavorites} isFavorite={isFavorite} setUserFavorites={setUserFavorites} />} />
            })}
          </Routes>
        </main>
      </div>
    </UserContext.Provider>
  )
}

export default App;
