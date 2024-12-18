const { supabase } = require('../supabaseClient.js');
const middleware = require('../middleware');


const Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let { data: users, error } = await supabase
      .from('users')
      .select("*")
      .eq('email', email);

    if ( 
      users[0] 
      && (await middleware.comparePassword( users[0].password_digest, password))
      ) {
      const trimmedUser = {
        id: users[0].id,
        email: users[0].email,
        name: users[0].username,
        image: users[0].image,
        favorites: users[0].favorites
      };

      if (error?.message) return res.status(400).send({ message: error.message });
      let token = middleware.createToken(trimmedUser);
      return res.send({ user: trimmedUser, token });
    }
    
    res.status(400).send({message: 'Error: No user found' })
    } catch (error) {
      // console.error(error)
      res.status(500).send(error);
    }
  };
    

const SignUp = async (req, res) => {
  const { email, password, username, image } = req.body;

  try {
    if (email && password && username) {
      const password_digest = await middleware.hashPassword(password);
      const { data, error } = await supabase
        .from("users")
        .insert([
          {
            username,
            email,
            password_digest,
            image,
          }
        ])
        .select();
      
      if (error?.message) return res.status(400).send({message: error.message});

      res.send({
        id: data[0].id,
        email: data[0].email,
        username: data[0].username,
        image: data[0].image,
        favoriteGames: data[0].favorite_games,
      });
    } else {
      res.status(400).send({ message: 'Invalid or missing values' });
    }
  } catch (error) {
    res.send(error);
  }
};

const CheckSession = async (req, res) => {
  try {
    const { payload } = res.locals;
    const user = await User.findByPk(payload.id, {attributes: ['id', 'name', 'email', 'image', 'favorites']});
    if (user) res.send(user);
    else res.send({message: 'User not found'});
  } catch (error) {
    throw error;
  }
};

const GetProfiles = async (req, res) => {
  try {
    const users = await User.findAll({attributes: ['id', 'name', 'email', 'image', 'favorites']});
    if (users) res.send(users);
    else res.send({message: 'Bad request'});
  } catch (error) {
    throw error;
  }
};

const GetUserProfile = async (req, res) => {
  try {
    const userId = req.params.user_id;
    const user = await User.findByPk(userId, {attributes: ['id', 'name', 'email', 'image', 'favorites']});
    if (user) res.send(user);
    else res.send({message: 'Error: User not found'})
  } catch (error) {
    throw error;
  }
};

const UpdatePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const { user_id: userId } = req.params;

  try {
    const password_digest = await middleware.hashPassword(newPassword);
    const { data: users, error } = await supabase
      .from('users')
      .update({
        password_digest,
        updatedAt: ((new Date()).toISOString()).toLocaleString('zh-TW')
      })
      .eq('id', userId)
      .select();

    if (error?.message) return res.status(400).send({ message: error.message });

    res.send({
      id: users[0].id,
      email: users[0].email,
      username: users[0].username,
      image: users[0].image,
      favorite_games: users[0].favorite_games,
    });
  } catch (error) {
    console.error(error)
    res.status(500).send(error);
  }
};

const UpdateUserFavorites = async (req, res) => {
  const { user_id: userId } = req.params;
  const { favoriteGames } = req.body;

  try {
    const { data: users, error } = await supabase
      .from('users')
      .update({ 
        favorite_games: favoriteGames,
        updatedAt: ((new Date()).toISOString()).toLocaleString('zh-TW')
      })
      .eq('id', userId)
      .select();

    if (error?.message) return res.status(400).send({ message: error.message });

    return res.send({
      id: users[0].id,
      email: users[0].email,
      username: users[0].username,
      image: users[0].image,
      favorite_games: users[0].favorite_games,
    });
    
  } catch (error) {
    throw error;
  }
};

const UpdateUser = async (req, res) => {
  const { user_id: userId } = req.params;
  const { email, username, image } = req.body;
  
  try {
    const { data: users, error } = await supabase
      .from("users")
      .update({ 
        email: email && email, 
        username: username && username, 
        image: image && image,
        updatedAt: ((new Date()).toISOString()).toLocaleString('zh-TW') 
      })
      .eq("id", userId)
      .select();
    
    if (error?.message) return res.status(400).send({ message: error.message })

    return res.send({
      id: users[0].id,
      email: users[0].email,
      username: users[0].username,
      image: users[0].image,
      favorite_games: users[0].favorite_games,
    });

  } catch (error) {
    console.error(error)
    res.status(500).send(error);
  }
};

const DeleteUser = async (req, res) => {
  const { user_id: userId } = req.params

  try {
    const { data, error } = await supabase
      .from('users')
      .delete()
      .eq('id', userId)
      .select()

    if (error?.message) return res.status(400).send({ message: error.message })

    return res.send({
      id: data[0].id,
      email: data[0].email,
      username: data[0].username,
    });

  } catch (error) {
    res.send({ message: `Unauthorized operation`, severity: 'error' });
  }
};


module.exports = {
  GetProfiles,
  GetUserProfile,
  UpdateUser,
  DeleteUser,
  UpdateUserFavorites,
  Login,
  SignUp,
  UpdatePassword,
  CheckSession
};
