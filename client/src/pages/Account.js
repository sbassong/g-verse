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
      <Box
        className="top-account"
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          p: 'auto',
          borderBottom: '1px solid #1b1b1b',
        }}
      >
        <Box
          className='profile-box'
          sx={{ m:2, mr: 4, ml: 4, }}
        >
          <Avatar 
            alt={user?.name}
            src={user?.image}
            sx={{ width: '9vw', height: '9vw', minWidth: '7rem', minHeight: '7rem', m: 2,  }}
          />  
        </Box>
        <Box
          className='profile-box'
          sx={{ m:2}}
        >
          <Typography variant="h6" sx={{mb: 1, fontWeight: '600'}} >{user?.name}</Typography>
          <Typography variant="h6">{user?.email}</Typography>
        </Box>
      </Box>

      <Box
        className="bottom-account"
        sx={{ display: 'flex', padding: 3, mt: 3, flexWrap: 'wrap', width: '100%'}}
      >
        <Box
          className='user-actions'
          sx={{ml: 'auto', mr: 'auto', pr: 1, pl: 1, minWidth: '200px', width: '15%'}}
        >
          <Button 
            onClick={showProfileForm}
            fullWidth
            variant="contained"
            sx={{ mb: 3}}
          >
              Update User profile 
          </Button>
          <Button 
            onClick={showPasswordForm}
            fullWidth
            variant="contained"
            sx={{ mb: 8 }}
          >
              Update Password 
          </Button>
          
          <Button 
            onClick={showPasswordForm}
            fullWidth
            variant="contained"
            sx={{ mb: 3, backgroundColor: 'red' }}
          >
            Sign Out 
          </Button>
          <Button 
            fullWidth
            variant="contained"
            sx={{ backgroundColor: 'darkred', mb: 5 }}
            onClick={() => handleDeleteUser(user?.id)}
          >
              Delete Account 
          </Button>
        </Box>
      
        <Box
          className='forms-container'
          sx={{ pl: 1, m: 'auto', width: '75%', minWidth: '200px' }}
        >
          { !currentForm &&
            <>
              <Typography variant="h5" sx={{textAlign: 'center', fontWeight: 'bold'}}>Favorite Games</Typography>
              <Favorites authenticated={authenticated} user={user} setUser={setUser} userFavorites={userFavorites} games={games} setUserFavorites={setUserFavorites}/>
            </>
          }
          { currentForm === 'profile' && profileButton && <UpdateProfile user={user} setUser={setUser} setAccountUpdated={setAccountUpdated} />}
          { currentForm === 'password' && passwordButton && <UpdatePassword user={user} setUser={setUser} setAccountUpdated={setAccountUpdated}/> }
        </Box>
      </Box>
    </div>
  );
          
}

export default Account
