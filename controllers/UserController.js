const { User } = require('../models');
const middleware = require('../middleware');
const { v4: uuidv4 } = require('uuid');


const Login = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { email: req.body.email },
      raw: true
    })
    if (
      user &&
      (await middleware.comparePassword(
        user.password_digest,
        req.body.password
        ))
        ) {
          const trimmedUser = {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
            favorites: user.favorites,
          }
          let token = middleware.createToken(trimmedUser);
          return res.send({ user: trimmedUser, token });
        }
        res.send({ status: 401, message: 'Error: No user found' })
      } catch (error) {
        throw error;
      }
    };
    
const SignUp = async (req, res) => {
  try {
    const { email, password, name, image } = req.body;
    
    if (email && password && name) {
      const password_digest = await middleware.hashPassword(password);
      const user = await User.create({ email, password_digest, name, image });
      
      const trimmedUser = {
        id: user.id,
        email: user.email,
        name: user.name,
        image: user.image,
        favorites: user.favorites,
      };

      return res.send(trimmedUser);
    }
    // res.send({message: 'Missing required values'});
  } catch (error) {
    throw error;
  }
};

const UpdatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const userId = req.params.user_id;
    const user = await User.findByPk(userId);
    if (
      user &&
      (await middleware.comparePassword(
        user.dataValues.password_digest,
        oldPassword
      ))
    ) {
      const password_digest = await middleware.hashPassword(newPassword)
      await user.update({ password_digest });
      const updatedUser = {
        id: user.id,
        email: user.email,
        name: user.name,
        image: user.image,
        favorites: user.favorites,
      };
      return res.send(updatedUser);
    }
    res.send({ status: 'Error', msg: 'Unauthorized' })
  } catch (error) {
    throw error;
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
    else res.send({message: 'User not found'})
  } catch (error) {
    throw error;
  }
};

const UpdateUserFavorites = async (req, res) => {
  try {
    const { favorites } = req.body;
    const user = await User.findByPk(req.params.user_id);
    if ( user ) {
      await user.update({ favorites });

      const updatedUser = {
        id: user.id,
        email: user.email,
        name: user.name,
        image: user.image,
        favorites: user.favorites,
      };
      return res.send(updatedUser);
    }
    res.send({ status: 'Error', msg: 'User not found' });
  } catch (error) {
    throw error;
  }
};

const UpdateUser = async (req, res) => {
  try {
    const userId = req.params.user_id;
    const user = await User.findByPk(userId);

    if ( user ) {
      await user.update(req.body);

      const updatedUser = {
        id: user.id,
        email: user.email,
        name: user.name,
        image: user.image,
        favorites: user.favorites,
      };

      return res.send(updatedUser);
    }
    res.send({ status: 'Error', msg: 'Unauthorized' });
  } catch (error) {
    throw error;
  }
};

const DeleteUser = async (req, res) => {
  try {
    const { deleteConfirmed } = req.body;

    if (deleteConfirmed) {
      const user = await User.findByPk(req.params.user_id);

      if (user) {
        const destroyedUser = await user.destroy();

        const destroyedResponse = {
          id: destroyedUser.id,
          email: destroyedUser.email,
          name: destroyedUser.name,
          image: destroyedUser.image,
          favorites: destroyedUser.favorites,
        };

        return res.send(destroyedResponse);
      } else res.send({message: 'User not found'});
    }
    res.send({ message: `Unauthorized operation` });
  } catch (error) {
    throw error;
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
