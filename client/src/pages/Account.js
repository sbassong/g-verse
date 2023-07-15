/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Navigate, useLocation } from 'react-router-dom'
import { useNavigate } from "react-router";
import '../styles/Account.css'
import {Avatar, Button, Box, Container, Typography} from '@mui/material';
import {DeleteUser} from '../services/UserServices'
import UpdatePassword from "../components/UpdatePassword";
import UpdateProfile from "../components/UpdateProfile";
import Favorites from "./Favorites";


const Account = ({authenticated, user, setUser, handleLogOut, userFavorites, games, setUserFavorites}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [accountUpdated, setAccountUpdated] = useState(false)
  const [currentForm, setForm] = useState(null);
  const [passwordButton, togglePassword] = useState(false);
  const [profileButton, toggleProfile] = useState(false);
  
  const showProfileForm = () => {
    if (currentForm === 'profile') {
      setForm(null);
      toggleProfile(false);
    } else if (!currentForm || currentForm === 'password') {
      setForm('profile');
      toggleProfile(true);
    }
  }
  
  const showPasswordForm = () => {
    if (currentForm === 'password') {
      setForm(null);
      togglePassword(false);
    } else if (!currentForm || currentForm === 'profile') {
      setForm('password')
      togglePassword(true);
    }
  }

  const handleDeleteUser = async (userId) => {
    // MySwal.fire({
    //   title: "Are you sure?",
    //   text: "This account will be permanently deleted!",
    //   icon: "warning",
    //   buttons: true,
    //   dangerMode: true,
    // })
    // .then((willDelete) => {
    //   if (willDelete) {
        await DeleteUser(userId);
        await handleLogOut();
        navigate('/signup');
      // }
    // })
  }


  useEffect(() => {
    if (authenticated && user) setUser(user);
  }, [authenticated])

  useEffect(() => {
    if (accountUpdated) setAccountUpdated(false);
  }, [accountUpdated])


  if (!(user && authenticated)) return <Navigate to="/signin" state={{ from: location }} replace />
  else return (
    <div className="account-page">
      <Container
        className="profile-ui"
        component="main"
        maxWidth="xs"
      >
        <Avatar 
          alt={user?.name}
          src={user?.image}
          sx={{ width: '8vw', height: '8vw', m: 3 }}
        />
        
        <Typography 
          component="h1"
          variant="h6"
          sx={{ml: 3, mb: 2}}
        >
          {user?.name}
        </Typography>
        <Typography
          component="h1"
          variant="h6"
          sx={{ml: 3}}
        >
          {user?.email}
        </Typography>

        <Box
          className='profile-box'
          sx={{
            padding: 3,
            marginTop: 6,
            marginLeft: 1,
            marginRight: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius:  2,
          }}
        >
          <Button 
            onClick={showProfileForm}
            fullWidth
            variant="contained"
            sx={{ mt: 2, mb: 2}}
          >
              Update User profile 
          </Button>
          <Button 
            onClick={showPasswordForm}
            fullWidth
            variant="contained"
            sx={{ mt: 2, mb: 3 }}
          >
              Update Password 
          </Button>
        </Box>
        <Box
          className='profile-box'
          sx={{
            padding: 3,
            marginTop: 6,
            marginLeft: 1,
            marginRight: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius:  2,
          }}
        >
          <Button 
            onClick={() => {
              handleDeleteUser(user?.id)
            }}
            fullWidth
            variant="contained"
            sx={{ mt: 'auto', mb: 0, backgroundColor: 'red' }}
          >
              Delete Account 
          </Button>
        </Box>
      </Container>
      
      <Container
        className="form-ui"
      >
        { !currentForm &&  <Favorites authenticated={authenticated} user={user} setUser={setUser} userFavorites={userFavorites} games={games} setUserFavorites={setUserFavorites}/>}
        { currentForm === 'profile' && profileButton && <UpdateProfile user={user} setUser={setUser} setAccountUpdated={setAccountUpdated} />}
        { currentForm === 'password' && passwordButton && <UpdatePassword user={user} setUser={setUser} setAccountUpdated={setAccountUpdated}/> }
      </Container>
    </div>
  );
          
}

export default Account
