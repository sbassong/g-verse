import React from 'react'
import { NavLink } from 'react-router-dom'
import SearchBar from './SearchBar'
import '../styles/nav.css'


const Nav = ({ handleLogOut, authenticated, user, setSearchResults }) => {
  let signedIn
  
  if (user) {
    signedIn = (
      <nav className='right-top-nav '>
        <NavLink className="menu-item subtitle" to="/user/account"><button className='log-but'>Account</button></NavLink>
        <NavLink className="menu-item subtitle" to="/cart"><button className='log-but' >Cart</button></NavLink>
        <NavLink className='menu-item subtitle' to="/"><button onClick={handleLogOut} className='sign-but'>Log Out</button></NavLink>
      </nav>
    )
  }
  
  const notSignedIn = (
    <nav className='right-top-nav'>
      <NavLink to="/signin"><button className='log-but menu-item subtitle'>Log In</button></NavLink>
      <NavLink to="/signup"><button className='sign-but menu-item subtitle'>Sign Up</button></NavLink>
    </nav>
  )
  

  return (
    <nav className='nav'>
      <NavLink className='logo' to='/'>G-VERSE</NavLink>

      <SearchBar setSearchResults={setSearchResults}/>

      <div className='menu-nav'>
        <NavLink className='menu-item subtitle' to='/'>Home</NavLink>
        <NavLink className='menu-item subtitle'  to='/games/listings'>Games</NavLink>
      </div>
        {/* {authenticated && user ? signedIn : notSignedIn} */}
    </nav>
  )
}

export default Nav