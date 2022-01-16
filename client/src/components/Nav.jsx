import React from 'react'
import { NavLink } from 'react-router-dom'
import SearchBar from './SearchBar'


const Nav = ({ handleLogOut, authenticated, user, setSearchResults }) => {
  let signedIn
  
  if (user) {
    signedIn = (
      <nav className='right-top-nav '>
        <NavLink className="a" to="/user/account"><button className='log-but'>Account</button></NavLink>
        <NavLink className="a" to="/cart"><button className='log-but' >Cart</button></NavLink>
        <NavLink to="/"><button onClick={handleLogOut} className='sign-but'>Sign Out</button></NavLink>
      </nav>
    )
  }
  
  const notSignedIn = (
    <nav className='right-top-nav'>
      <NavLink to="/signin"><button className='log-but'>Sign In</button></NavLink>
      <NavLink to="/signup"><button className='sign-but'>Sign Up</button></NavLink>
    </nav>
  )
  

  return (
    <header>
      <nav className='top-nav'>
        <section className='left-top-nav'>
          <NavLink className='logo' to='/'><img src="https://i.imgur.com/cNe1mtg.png?2" alt="GameStart logo" /></NavLink>
        </section>

        {authenticated && user ? signedIn : notSignedIn}
      </nav>

      <nav className='bottom-nav'>
        <section className='right-bottom-nav'>
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/games/listings'>Games</NavLink>
          <NavLink to='/about'>About</NavLink>
        </section>

        <section className='left-bottom-nav'> 
          <SearchBar setSearchResults={setSearchResults}/>
        </section>
      </nav>

    </header>
  )
}

export default Nav