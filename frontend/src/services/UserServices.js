import Client from './api'

export const SignInUser = async (data) => {
  try {
    const res = await Client.post('/users/signin', data);
    if (res?.data?.user) {
      localStorage.setItem('gverse-token', res.data.token);
      return res.data.user;
    } else return res.data.message;

  } catch (error) {
    throw error;
  }
};

export const SignOut = async (data) => {
  try {
    const res = await Client.post('/users/signout', data);
    console.log(res)
    if (!res.data?.isAuthenticated) {
      localStorage.removeItem('gverse-token');
      localStorage.removeItem('gverse-authenticated');
      return res.data;
    } else return res.data.message;

  } catch (error) {
    throw error;
  }
};

export const SignUpUser = async (data) => {
  try {
    const res = await Client.post('/users', data);
    if (res?.data?.email) return res.data;
    else return res.data.message;
  } catch (error) {
    throw error;
  }
};

export const CheckSession = async () => {
  try {
    const res = await Client.get('/users/session');
    if (res.data?.isAuthenticated) return res.data;
    else return res.data?.message;
  } catch (error) {
    throw error;
  }
};

export const GetUser = async (userId) => {
  try {
    const res = await Client.get(`/users/${userId}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const GetAllUsers = async () => {
  try {
    const res = await Client.get(`/users`);
    if (res.data?.email) return res.data
    else return res.data?.message;
  } catch (error) {
    throw error;
  }
};

export const UpdateUserPassword = async (userId, data) => {
  try {
    const res = await Client.put(`/users/${userId}/password/update`, data);
    if (res.data?.email) return res.data;
    else return res.data?.message;
  } catch (error) {;
    throw error
  }
};

export const UpdateUser = async (userId, data) => {
  try {
    const res = await Client.put(`/users/${userId}/profile/update`, data)
    if (res.data?.email) return res.data
    else return res.data?.message;
  } catch (error) {
    throw error
  }
}

export const UpdateUserFavorites = async (userId, data) => {
  try {
    const res = await Client.put(`/users/${userId}/favorites/update`, data)
    if (res.data?.email) return res.data
    else return res.data?.message;
  } catch (error) {
    throw error
  }
}

export const DeleteUser = async (userId) => {
  try {
    const res = await Client.delete(`/users/${userId}/delete`)
    return res.data
  } catch (error) {
    throw error
  }
}
