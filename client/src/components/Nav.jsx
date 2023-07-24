import React from 'react'
import '../styles/nav.css'
import { NavLink } from 'react-router-dom'
import SearchBar from './SearchBar'
import AccountMenu from './ProfileMenu';


const Nav = ({ handleLogOut, authenticated, user, setSearchResults }) => {
  
  return (
    <nav className='nav'>
      <NavLink className='logo' to='/'>G-VERSE</NavLink>
      <SearchBar setSearchResults={setSearchResults}/>
      <div className='menu-nav'>
        <NavLink className='menu-item title no-display-max' to='/'>Home</NavLink>
        <NavLink className='menu-item title no-display-max' to='/library/games'>Library</NavLink>
        <AccountMenu handleLogOut={handleLogOut} user={user} authenticated={authenticated} />
      </div>
    </nav>
  )
}

export default Nav