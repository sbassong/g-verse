const { supabase } = require('../supabaseClient.js');
const middleware = require('../middleware');


const SignIn = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const { data: users, error } = await supabase
      .from('users')
      .update({
        isAuthenticated: true,
        updatedAt: ((new Date()).toISOString()).toLocaleString('en-US')
      })
      .eq('email', email)
      .select("id, email, username, image, favoriteGames, isAuthenticated, passwordDigest");
      // .select("id, email, username, image, favoriteGames:games!gameId(games()), isAuthenticated, passwordDigest");
    if (error) return res.status(400).send(error);

    if ( 
      users[0] 
      && (await middleware.comparePassword( users[0].passwordDigest, password))
      ) {
      let token = middleware.createToken(users[0]);
      return res.send({ user: users[0], token });
    }
    
    res.status(400).send({message: 'Error: No user found' })
  } catch (error) {
    res.status(500).send(error);
  }
};
    
const SignUp = async (req, res) => {
  const { email, password, username, image } = req.body;

  try {
    if (email && password && username) {
      const passwordDigest = await middleware.hashPassword(password);
      
      const { data: users, error } = await supabase
        .from("users")
        .insert([
          {
            username,
            email,
            passwordDigest,
            image,
            favoriteGames: []
          }
        ])
        .select("id, email, username, image, favoriteGames, isAuthenticated");
      
      if (error) return res.status(400).send(error);

      res.send(users[0]);
    } else {
      res.status(400).send({ message: 'Invalid or missing values' });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const CheckSession = async (req, res) => {
  try {
    const { payload } = res.locals;
    const { data: users, error } = await supabase
      .from("users")
      .select("id, email, username, image, favoriteGames, isAuthenticated")
      .eq("id", payload.id);

    if (error) return res.status(400).send(error);

    res.send(users[0]);
  } catch (error) {
    res.status(500).send(error);
  }
};

const GetProfiles = async (req, res) => {
  try {
    const { data: users, error } = await supabase
      .from("users")
      .select("id, email, username, image, favoriteGames, isAuthenticated");

    if (error?.message) return res.status(400).send(error);

    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
};

const GetUserProfile = async (req, res) => {
  const { userId } = req.params;

  try {
    const { data: users, error } = await supabase
    .from("users")
    .select("id, email, username, image, favoriteGames, isAuthenticated")
    .eq("id", userId);

    if (error) return res.status(400).send(error);

    res.send(users[0]);
  } catch (error) {
    res.status(500).send(error);
  }
};

const UpdatePassword = async (req, res) => {
  const { newPassword } = req.body;
  const { userId } = req.params;

  try {
    const passwordDigest = await middleware.hashPassword(newPassword);
    const { data: users, error } = await supabase
      .from('users')
      .update({
        passwordDigest,
        updatedAt: ((new Date()).toISOString()).toLocaleString('en-US')
      })
      .eq('id', userId)
      .select("id, email, username, image, favoriteGames, isAuthenticated");

    if (error) return res.status(400).send(error);

    res.send(users[0]);
  } catch (error) {
    res.status(500).send(error);
  }
};

// gotta  figure out how to handle favorite games, whether referencing or pushing in ids to be  fetched
const UpdateUserFavorites = async (req, res) => {
  const { userId } = req.params;
  const { favoriteGames } = req.body;

  try {
    const { data: users, error } = await supabase
      .from('users')
      .update({ 
        favoriteGames,
        updatedAt: ((new Date()).toISOString()).toLocaleString('en-US')
      })
      .eq('id', userId)
      .select("id, email, username, image, favoriteGames, isAuthenticated");

    if (error) return res.status(400).send(error)

    res.send(users[0]);
  } catch (error) {
    res.status(500).send(error);
  }
};

const UpdateUser = async (req, res) => {
  const { userId } = req.params;
  const { email, username, image } = req.body;
  
  try {
    const { data: users, error } = await supabase
      .from("users")
      .update({ 
        email: email && email, 
        username: username && username, 
        image: image && image,
        updatedAt: ((new Date()).toISOString()).toLocaleString('en-US') 
      })
      .eq("id", userId)
      .select("id, email, username, image, favoriteGames, isAuthenticated");
    
    if (error) return res.status(400).send(error);

    res.send(users[0]); 

  } catch (error) {
    res.status(500).send(error);
  }
};

const DeleteUser = async (req, res) => {
  const { userId } = req.params

  try {
    const { data: users, error } = await supabase
      .from('users')
      .delete()
      .eq('id', userId)
      .select("id, email, username");

    if (error) return res.status(400).send(error);

    res.send(users[0]);
  } catch (error) {
    res.status(500).send(error);
  }
};

const SignOut = async (req, res) => {
  const { id } = req.body

  try {
    const { data: users, error } = await supabase
      .from('users')
      .update({ 
        isAuthenticated: false, 
        updatedAt: ((new Date()).toISOString()).toLocaleString('en-US')
      })
      .eq('id', id)
      .select("id, email, username, image, favoriteGames, isAuthenticated");

    if (error) return res.status(400).send(error);

    res.send(users[0]);
  } catch (error) {
    res.status(500).send(error);
  }
};


module.exports = {
  GetProfiles,
  GetUserProfile,
  UpdateUser,
  DeleteUser,
  UpdateUserFavorites,
  SignIn,
  SignUp,
  UpdatePassword,
  CheckSession,
  SignOut
};
