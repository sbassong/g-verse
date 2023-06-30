import React from 'react'
import '../styles/nav.css'
import { NavLink } from 'react-router-dom'
import SearchBar from './SearchBar'
import { VscAccount } from "react-icons/vsc";

import AccountMenu from './profile-menu';


const Nav = ({ handleLogOut, authenticated, user, setSearchResults }) => {
  
  return (
    <nav className='nav'>
      <NavLink className='logo' to='/'>G-VERSE</NavLink>
      <SearchBar setSearchResults={setSearchResults}/>
      <div className='menu-nav'>
        <NavLink className='menu-item subtitle no-display-max' to='/'>Home</NavLink>
        <NavLink className='menu-item subtitle no-display-max' to='/games/listings'>Library</NavLink>
        <AccountMenu handleLogOut={handleLogOut} />
      </div>
    </nav>
  )
}

export default Nav