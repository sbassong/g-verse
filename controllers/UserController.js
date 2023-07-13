const { User, Game, Cart } = require('../models')
const middleware = require('../middleware')

// AUTH FUNCTIONS
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
      let token = middleware.createToken(trimmedUser)
      return res.send({ user: trimmedUser, token })
    }
    res.status(401).send({ status: 'Error', msg: 'No user matches this email or password. Try again.' })
  } catch (error) {
    throw error
  }
}

const SignUp = async (req, res) => {
  try {
    const { email, password, name, image } = req.body
    let password_digest = await middleware.hashPassword(password)
    const user = await User.create({ email, password_digest, name, image })
    const trimmedUser = {
      id: user.id,
      email: user.email,
      name: user.name,
      image: user.image,
      favorites: user.favorites,
    };

    res.send(trimmedUser)
  } catch (error) {
    throw error
  }
}

const UpdatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body
    const user = await User.findByPk(req.params.user_id)
    if (
      user &&
      (await middleware.comparePassword(
        user.dataValues.password_digest,
        oldPassword
      ))
    ) {
      let password_digest = await middleware.hashPassword(newPassword)
      await user.update({ password_digest })
      const trimmedUpdatedUser = {
        id: user.id,
        email: user.email,
        name: user.name,
        image: user.image,
        favorites: user.favorites,
      }
      return res.send(trimmedUpdatedUser)
    }
    res.status(401).send({ status: 'Error', msg: 'Unauthorized' })
  } catch (error) {
    throw error
  }
}

const CheckSession = async (req, res) => {
  try {
    const { payload } = res.locals
    const user = await User.findByPk(payload.id, {attributes: ['id', 'name', 'email', 'image', 'favorites']})
    res.send(user)
  } catch (error) {
    throw error
  }
}

// USERS FUNCTIONS
const GetProfiles = async (req, res) => {
  try {
    const users = await User.findAll({attributes: ['id', 'name', 'email', 'image', 'favorites']})
    res.send(users)
  } catch (error) {
    throw error
  }
}

const GetUserProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.user_id, {attributes: ['id', 'name', 'email', 'image', 'favorites']})
    res.send(user)
  } catch (error) {
    throw error
  }
}

const UpdateUser = async (req, res) => {
  try {
    let userId = parseInt(req.params.user_id)
    const updatedUser = await User.update(req.body, {
      where: { id: userId },
      returning: true
    })
    const trimmedUpdatedUser = {
      id: updatedUser.id,
      email: updatedUser.email,
      name: updatedUser.name,
      image: updatedUser.image,
      favorites: updatedUser.favorites,
    }
    res.send(trimmedUpdatedUser)
  } catch (error) {
    throw error
  }
}

const DeleteUser = async (req, res) => {
  try {
    let userId = parseInt(req.params.user_id)
    await User.destroy({ where: { id: userId } })
    res.send({ message: `Deleted User with an id of ${userId}` })
  } catch (error) {
    throw error
  }
}


module.exports = {
  // USERS FUNCTIONS
  GetProfiles,
  GetUserProfile,
  UpdateUser,
  DeleteUser,

  // AUTH FUNCTIONS
  Login,
  SignUp,
  UpdatePassword,
  CheckSession
}
