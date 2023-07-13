import Client from './api'

export const SignInUser = async (data) => {
  try {
    const res = await Client.post('/users/login', data)
    localStorage.setItem('token', res.data.token)
    return res.data.user
  } catch (error) {
    throw error
  }
}

export const SignUpUser = async (data) => {
  try {
    const res = await Client.post('/users/signup', data)
    return res.data
  } catch (error) {
    throw error
  }
}

export const CheckSession = async () => {
  try {
    const res = await Client.get('/users/session')
    return res.data
  } catch (error) {
    throw error
  }
}

export const GetUser = async (user_id) => {
  try {
    const res = await Client.get(`/users/${user_id}`)
    return res.data
  } catch (error) {
    throw error
  }
}

export const GetAllUsers = async () => {
  try {
    const res = await Client.get(`/users`)
    return res.data
  } catch (error) {
    throw error
  }
}

export const UpdateUserPassword = async (user_id, data) => {
  try {
    const res = await Client.post(`/users/update/password/${user_id}`, data)
    return res.data
  } catch (error) {
    throw error
  }
}

export const UpdateUser = async (user_id, data) => {
  try {
    const res = await Client.put(`/users/update/${user_id}`, data)
    return res.data
  } catch (error) {
    throw error
  }
}

export const DeleteUser = async (user_id) => {
  try {
    const res = await Client.delete(`/users/delete/${user_id}`)
    return res.data
  } catch (error) {
    throw error
  }
}
