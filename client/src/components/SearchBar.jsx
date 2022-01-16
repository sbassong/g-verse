import React, {useState} from 'react'
import { FaSistrix } from 'react-icons/fa'
import {GetGamesByTitle} from '../services/GameServices'
import { useNavigate } from 'react-router'

const SearchBar = ({ setSearchResults }) => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')

  const getSearchResults = async (e) => {
    try {
      e.preventDefault()
      let results = await GetGamesByTitle(searchQuery)
      setSearchResults(results)
      setSearchQuery('')
      navigate('/search/results')
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
        <input onChange={(e) => handleChange(e)} value={searchQuery} className='search-input' type="text" placeholder="Enter game title" icon={<FaSistrix />} />
        <button className='search-button' type='submit' >Search</button>
      </form>
    </div>
  )
}

export default SearchBar