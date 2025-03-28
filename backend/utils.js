const { supabase } = require('./supabaseClient.js');

function parseDateString(dateString) {
  const [year, month, day] = dateString.split('-').map(Number);
  // Remember that JavaScript months are 0-indexed
  const date = new Date(year, month - 1, day);

  return ((date).toISOString()).toLocaleString('en-US')
}
// const date = parseDateString("2018-10-26");
// console.log(date); 


// run to seed games from rawg, change the page query and repeat as needed
const FetchRawgGames = async (req, res) => {
  try {
    const response = await fetch(`https://api.rawg.io/api/games?key=${process.env.RAWG_KEY}&dates=2000-01-01,2024-12-19&page_size=40&page=8&ordering=+metacritic&publishers=${process.env.RAWG_PUBLISHERS}`)
    if (response) {
      const re = await response.json()
      const games = [];
      re.results.forEach(({
        id,
        slug,
        name,
        rating,
        background_image,
        released,
        genres,
        platforms,
        metacritic
      }) => {
        if (background_image) {
          games.push({
            id,
            slug,
            name,
            rating,
            backgroundImage: background_image,
            released: parseDateString(released),
            genres: genres.length ? genres.map((genre) => genre.name) : [],
            platforms: platforms.length ? platforms.map((platform) => platform.platform.name) : [],
            metacritic: metacritic === null ? 0 : metacritic,
          })
        }
      })
      console.log(games.length)
      console.log(games.slice(0, 5))
      // const { data: gameentries, error } = await supabase
      //   .from("games")
      //   .insert(games)
      //   .select();
      // if (error) return res.send(error)
      // return res.send(gameentries.slice(0, 20));
    }
    // console.log(response)
  } catch (error) {
    console.error(error)
  }
};

module.exports = {
  parseDateString,
  FetchRawgGames
}