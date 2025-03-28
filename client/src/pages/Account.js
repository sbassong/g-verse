/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";
import { Navigate, useLocation } from 'react-router-dom'
import { useNavigate } from "react-router";
import '../styles/Account.css'
import {Avatar, Button, Box, Typography, Dialog, DialogActions, DialogContentText, DialogContent, DialogTitle } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert'
import {DeleteUser} from '../services/UserServices'
import UpdatePassword from "../components/UpdatePassword";
import UpdateProfile from "../components/UpdateProfile";
import Favorites from "./Favorites";
import { UserContext } from '../utils';


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Account = ({authenticated, setUser, handleLogOut, userFavorites, games, setUserFavorites}) => {
  const authenticatedUser = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [accountUpdated, setAccountUpdated] = useState(false)
  const [currentForm, setForm] = useState(null);
  const [passwordButton, togglePassword] = useState(false);
  const [profileButton, toggleProfile] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState(null);
  const [snackSeverity,  setSnackSeverity] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSetDialogOpen = () => setDialogOpen(true);
  const handleSetDialogClose = () => setDialogOpen(false);
  const handleShowSnack = () => setSnackOpen(true);

  const handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackOpen(false);
  };
  
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
  };
  
  const handleSnack = (message, severity) => {
    setSnackMessage(message);
    setSnackSeverity(severity);
    handleShowSnack();
  };
  
  const handleDeleteUser = async () => {
    const deletedUser = await DeleteUser(authenticatedUser?.id);
    handleSetDialogClose();
    if (deletedUser?.email) {
      navigate('/signup');
      await handleLogOut();
    } else handleSnack(deletedUser.message, deletedUser.severity);
  };

  useEffect(() => {
    if (authenticated && authenticatedUser) {
      setUser(authenticatedUser);
      setUserFavorites(authenticatedUser?.favoriteGames);
    }
  }, [authenticated]);

  useEffect(() => {
    if (accountUpdated) setAccountUpdated(false);
  }, [accountUpdated, authenticatedUser]);


  if (!authenticatedUser) return <Navigate to="/signin" state={{ from: location }} replace />
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
            alt={authenticatedUser?.username}
            src={authenticatedUser?.image}
            sx={{ width: '9vw', height: '9vw', minWidth: '7rem', minHeight: '7rem', m: 2,  }}
          />  
        </Box>
        <Box
          className='profile-box'
          sx={{ m:2}}
        >
          <Typography variant="h6" sx={{mb: 1, fontWeight: '600'}} >{authenticatedUser?.username}</Typography>
          <Typography variant="h6">{authenticatedUser?.email}</Typography>
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
            onClick={handleLogOut}
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
            onClick={handleSetDialogOpen}
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
              <Favorites authenticated={authenticated} user={authenticatedUser} setUser={setUser} userFavorites={userFavorites} games={games} setUserFavorites={setUserFavorites}/>
            </>
          }
          { currentForm === 'profile' && profileButton && <UpdateProfile user={authenticatedUser} setUser={setUser} setAccountUpdated={setAccountUpdated} handleSnack={handleSnack} setForm={setForm} />}
          { currentForm === 'password' && passwordButton && <UpdatePassword user={authenticatedUser} setUser={setUser} setAccountUpdated={setAccountUpdated} handleSnack={handleSnack} setForm={setForm} /> }
        </Box>
      </Box>
      
      <Snackbar
        open={snackOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnack}
      >
        <Alert
          onClose={handleCloseSnack}
          severity={snackSeverity}
          sx={{ width: '100%' }}
        >
          {snackMessage}
        </Alert>
      </Snackbar>

      <Dialog
        open={dialogOpen}
        onClose={handleSetDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle sx={{color: 'black', mt: 2, ml: 2, mr: 2, textAlign: 'center'}} id="alert-dialog-description">Delete account?</DialogTitle>
        <DialogActions
          sx={{mb: 1, justifyContent: 'center'}}
        >
          <Button sx={{ backgroundColor: 'red'}} variant="contained" onClick={handleDeleteUser}>Delete</Button>
          <Button variant="contained" onClick={handleSetDialogClose} autoFocus >Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );   
}

export default Account
