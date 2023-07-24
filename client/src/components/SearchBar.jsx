import React, {useState} from 'react'
import {GetGamesByTitle} from '../services/GameServices'
import { useNavigate } from 'react-router'
import { ReactComponent as SearchIcon } from '../../src/styles/icons/search.svg';

const SearchBar = ({ setSearchResults }) => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')

  const getSearchResults = async (e) => {
    try {
      e.preventDefault();
      console.log(searchQuery);
      let results = await GetGamesByTitle({searchQuery});
      setSearchResults(results);
      setSearchQuery('');
      navigate('/games/search/results');
    } catch (err) {
      throw err
    }
  }

  const handleChange = (e) => {
    setSearchQuery(e.target.value)
  }
  
  return (
    <div className='search-bar'>
      <form onSubmit={(e) => getSearchResults(e)} className='search-form'>
        <SearchIcon className='search-icon' />
        <input onChange={(e) => handleChange(e)} 
          value={searchQuery} 
          className='search-input' 
          type="text" 
          placeholder="Search the game-verse" 
        />
      </form>
    </div>
  )
}

export default SearchBar