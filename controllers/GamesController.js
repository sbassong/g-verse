const { User, Game, Review } = require('../models')
const { Op, literal, fn, col } = require('sequelize')

const GetPopularGames = async (req, res) => {
  try {
    const popular = await Game.findAll({
      order: [['rating', 'DESC']],
      where: { rating: { [Op.gt]: 8 } },
      limit: 10
    })
    res.send(popular)
  } catch (error) {
    throw error
  }
}

const GetRecentGames = async (req, res) => {
  try {
    const recents = await Game.findAll({
      order: [['createdAt', 'DESC']],
      limit: 10
    })
    res.send(recents)
  } catch (error) {
    throw error
  }
}

const GetGames = async (req, res) => {
  try {
    const games = await Game.findAll()
    res.send(games)
  } catch (error) {
    throw error
  }
}

const GetGameByTitle = async (req, res) => {
  try {
    const games = await Game.findAll({
      where: { title: { [Op.like]: `%${req.params.game_title}%` } }
    })
    res.send(games)
  } catch (error) {
    throw error
  }
}
const CreateGame = async (req, res) => {
  try {
    const game = await Game.create(req.body)
    res.send(game)
  } catch (error) {
    throw error
  }
}
// const DeleteGame = async (req, res) => {
//   try {
//     await Game.destroy({
//       where: { id: req.params.game_id }
//     })
//     res.send({ msg: 'Game successfully deleted' })
//   } catch (error) {
//     throw error
//   }
// }

const GetOneGame = async (req, res) => {
  try {
    const gameId = parseInt(req.params.game_id)
    const game = await Game.findByPk(gameId)
    res.send(game)
  } catch (error) {
    throw error
  }
}

module.exports = {
  GetPopularGames,
  GetRecentGames,
  GetGames,
  GetGameByTitle,
  CreateGame,
  GetOneGame
}
