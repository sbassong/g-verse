const { Game } = require('../models');
const { Op } = require('sequelize');

const GetPopularGames = async (req, res) => {
  try {
    const popularGames = await Game.findAll({
      order: [['rating', 'DESC']],
      where: { rating: { [Op.gt]: 8 } },
      limit: 10
    });
    res.send(popularGames);
  } catch (error) {
    throw error;
  }
};

const GetRecentGames = async (req, res) => {
  try {
    const recentGames = await Game.findAll({
      order: [['createdAt', 'DESC']],
      limit: 10
    });

    res.send(recentGames);
  } catch (error) {
    throw error;
  }
};

const GetGames = async (req, res) => {
  try {
    const allGames = await Game.findAll();
    res.send(allGames);
  } catch (error) {
    throw error;
  }
};

const GetGameByTitle = async (req, res) => {
  try {
    const {searchQuery} = req.body
    const games = await Game.findAll({
      where: { title: { [Op.iLike]: `${searchQuery}%` } },
    });
    res.send(games);
  } catch (error) {
    throw error;
  }
};

const CreateGame = async (req, res) => {
  try {
    const game = await Game.create(req.body);
    res.send(game);
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
    const game = await Game.findByPk(req.params.game_id);
    res.send(game);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  GetPopularGames,
  GetRecentGames,
  GetGames,
  GetGameByTitle,
  CreateGame,
  GetOneGame
}
