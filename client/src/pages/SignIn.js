import '../styles/SignIn.css'
import React, { useState } from 'react';
import { NavLink, useLocation, Navigate } from 'react-router-dom'
import { useNavigate } from "react-router";
import { ThemeProvider } from '@mui/material/styles';
import {Avatar, Button, TextField, IconButton, Box, Typography, Container, InputAdornment, } from '@mui/material/';
import {Visibility, VisibilityOff} from '@mui/icons-material/';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CustomizedInputsStyleOverrides from '../styles/muiOverrides';
import { SignInUser } from '../services/UserServices'

const iState = { email: '', password: '' };

const SignIn = ({user, setUser, authenticated, toggleAuthenticated}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState(iState);

  const handleFormChange = (e) => setFormValues({ ...formValues, [e.target.name]: e.target.value });
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await SignInUser(formValues);

    if (user?.email) {
      setFormValues(iState);
      await setUser(user);
      toggleAuthenticated(true);
      navigate('/user/account');
    }
    return;
  };


  if (user && authenticated) return <Navigate to="/user/account" state={{ from: location }} replace />
  else return (
    <ThemeProvider theme={CustomizedInputsStyleOverrides}>
      <Container component="main" maxWidth="sm">
        <Box
          sx={{
            padding: 3,
            marginTop: 12,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius:  2,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#2dc14f' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              placeholder="firstname@email.com"
              value={formValues.email}
              onChange={handleFormChange}
              autoComplete="email"
              autoFocus
              className='signin-email-field'
              sx={{
                borderRadius: 1,
                backgroundColor: 'rgba(225, 225, 225)',
              }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="outlined-adornment-password"
              value={formValues.password}
              autoComplete="current-password"
              className='signin-password-field'
              color="grey"
              onChange={handleFormChange}
              sx={{
                borderRadius: 1,
                backgroundColor: 'rgba(225, 225, 225)',
              }}
              InputProps={{
                endAdornment: <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="start"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>,
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 6, mb: 3, backgroundColor: '#2dc14f' }}
            >
              Sign In
            </Button>
            <Box className='separator-line'><span className='or-span'>OR</span></Box>
              <NavLink className='menu-item subtitle no-display-max' to='/signup'>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, backgroundColor: '#757ce8', borderColor: 'red' }}
                >
                  Create Account
                </Button>
              </NavLink>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
  
}

export default SignIn;