const { supabase } = require('../supabaseClient.js');

const GetGames = async (req, res) => {
  try {
    let { data: games, error } = await supabase
      .from('games')
      .select("id, name, rating, backgroundImage, released, price, platforms, genres, metacritic");
    if (error?.message) return res.status(400).send(error);
    else res.send(games);

  } catch (error) {
    throw error;
  }
};

const SearchGames = async (req, res) => {
  const { name } = req.query;
  
  try {
    let { data: games, error } = await supabase
      .from('games')
      .select("id, name, rating, backgroundImage, released, price, platforms, genres, metacritic")
      .ilike('name', `%${name}%`);

    if (error?.message) return res.status(400).send(error);
    else res.send(games);
  } catch (error) {
    throw error;
  }
};


const GetGameById = async (req, res) => {
  const { gameId } = req.params;

  try {
    const { data: games, error } = await supabase
      .from("games")
      .select("id, name, rating, backgroundImage, released, price, platforms, genres, metacritic")
      .eq("id", gameId);

    if (error) return res.send(error);
    else res.send(games[0]);
  } catch (error) {
    throw error;
  }
};

const GetGameByPlatform = async (req, res) => {
  const { platforms } = req.query;

  try {
    const { data: games, error } = await supabase
      .from("games")
      .select("id, name, rating, backgroundImage, released, price, platforms, genres, metacritic")
      .containedBy("platforms", platforms.split(','));

    if (error) return res.send(error);
    else res.send(games);
  } catch (error) {
    throw error;
  }
};

const GetGameByGenre = async (req, res) => {
  const { genres } = req.query;

  try {
    const { data: games, error } = await supabase
      .from("games")
      .select("id, name, rating, backgroundImage, released, price, platforms, genres, metacritic")
      .containedBy("genres", genres.split(','));

    if (error) return res.send(error)
    else res.send(games);
  } catch (error) {
    throw error;
  }
};

const GetPopularGames = async (req, res) => {
  try {
    const { data: games, error } = await supabase
      .from('games')
      .select("id, name, rating, backgroundImage, released, price, platforms, genres, metacritic")
      .order('rating', { ascending: false })
      .range(0, 19);

    if (error) return res.send(error)
    else res.send(games);
  } catch (error) {
    throw error;
  }
};

const GetRecentGames = async (req, res) => {
  try {
    const { data: games, error } = await supabase
      .from('games')
      .select("id, name, rating, backgroundImage, released, price, platforms, genres, metacritic")
      .order('released', { ascending: false })
      .range(0, 19);

    if (error) return res.send(error)
    else res.send(games);
  } catch (error) {
    throw error;
  }
};



module.exports = {
  GetPopularGames,
  GetRecentGames,
  GetGames,
  SearchGames,
  GetGameById,
  GetGameByPlatform,
  GetGameByGenre
}
