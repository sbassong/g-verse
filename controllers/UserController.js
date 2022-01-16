const { User, Game, Cart } = require('../models')
const middleware = require('../middleware')

//  AUTH FUNCTIONS //  AUTH FUNCTIONS //  AUTH FUNCTIONS
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
      let payload = {
        id: user.id,
        email: user.email
      }
      let token = middleware.createToken(payload)
      return res.send({ user: payload, token })
    }
    res.status(401).send({ status: 'Error', msg: 'Unauthorized' })
  } catch (error) {
    throw error
  }
}

const SignUp = async (req, res) => {
  try {
    const { email, password, name, image } = req.body
    let password_digest = await middleware.hashPassword(password)
    const user = await User.create({ email, password_digest, name, image })
    const cart = await Cart.create({user_id: user.dataValues.id})
    res.send({user, cart})
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
      return res.send({ status: 'Ok', payload: user })
    }
    res.status(401).send({ status: 'Error', msg: 'Unauthorized' })
  } catch (error) {
    throw error
  }
}

const CheckSession = async (req, res) => {
  try {
    const { payload } = res.locals
    const user = await User.findByPk(payload.id, {attributes: ['id', 'name', 'email', 'image']})
    res.send(user)
  } catch (error) {
    throw error
  }
}

//USERS FUNCTIONS //USERS FUNCTIONS//USERS FUNCTIONS

const GetProfiles = async (req, res) => {
  try {
    const users = await User.findAll()
    res.send(users)
  } catch (error) {
    throw error
  }
}

const GetUserProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.user_id)
    res.send(user)
  } catch (error) {
    throw error
  }
}

const UpdateUser = async (req, res) => {
  try {
    let userId = parseInt(req.params.user_id)
    let updatedUser = await User.update(req.body, {
      where: { id: userId },
      returning: true
    })
    res.send(updatedUser)
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
  //USERS FUNCTIONS
  GetProfiles,
  GetUserProfile,
  UpdateUser,
  DeleteUser,

  //  AUTH FUNCTIONS
  Login,
  SignUp,
  UpdatePassword,
  CheckSession
}
