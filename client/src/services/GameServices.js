import Client from './api'

export const GetGames = async () => {
  try {
    const res = await Client.get('/games')
    return res.data
  } catch (error) {
    throw error
  }
}

export const GetRecentGames = async () => {
  try {
    const res = await Client.get('/games/recent')
    return res.data
  } catch (error) {
    throw error
  }
}

export const GetPopularGames = async () => {
  try {
    const res = await Client.get('/games/popular')
    return res.data
  } catch (error) {
    throw error
  }
}

export const GetGamesByTitle = async (data) => {
  try {
    const res = await Client.get(`/games/name/search?name=${data.name}`)
    return res.data
  } catch (error) {
    throw error
  }
}
export const GetGamesByPlatforms= async (data) => {
  try {
    const res = await Client.get(`/games/platforms/search?platforms=${data.platforms.join(',') }`)
    return res.data
  } catch (error) {
    throw error
  }
}

export const GetGamesByGenres = async (data) => {
  try {
    const res = await Client.get(`/games/genres/search?genres=${data.genres.join(',')}`)
    return res.data
  } catch (error) {
    throw error
  }
}

export const GetOneGame = async (game_id) => {
  try {
    const res = await Client.get(`/games/${game_id}`)
    return res.data
  } catch (error) {
    throw error
  }
}

