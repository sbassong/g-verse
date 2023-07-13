import '../styles/SignIn.css'
import React, {useState} from 'react';
import { NavLink } from 'react-router-dom'
import { useNavigate } from "react-router";
import { ThemeProvider } from '@mui/material/styles';
import {Avatar, Button, TextField, IconButton, Box, Typography, Container, InputAdornment, } from '@mui/material/';
import {Visibility, VisibilityOff} from '@mui/icons-material/';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { SignUpUser } from '../services/UserServices'
import CustomizedInputsStyleOverrides from '../styles/muiOverrides';

const iState = {
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
};

const SignUp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmedPassword, setShowConfirmedPassword] = useState(false);
  const [formValues, setFormValues] = useState(iState);

  const handleFormChange = (e) => setFormValues({ ...formValues, [e.target.name]: e.target.value });
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () => setShowConfirmedPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();
  const handleMouseDownConfirmedPassword = (event) => event.preventDefault();


  const handleSubmit = async (e) => {
    e.preventDefault();
    await SignUpUser({
      name: formValues.name,
      email: formValues.email,
      password: formValues.password
    });
    setFormValues(iState);
    navigate('/signin');
  }

  return (
    <ThemeProvider theme={CustomizedInputsStyleOverrides}>
      <Container component="main" maxWidth="sm">
        <Box
          sx={{
            padding: 3,
            marginTop: 6,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius:  2,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#757ce8' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>

            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Account Name"
              name="name"
              placeholder="Firstname Lastname"
              value={formValues.name}
              onChange={handleFormChange}
              autoComplete="name"
              autoFocus
              className='signup-name-field'
              sx={{
                borderRadius: 1,
                backgroundColor: 'rgba(225, 225, 225)',
              }}
              />

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
              // focused
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

            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Comfirm Password"
              type={showConfirmedPassword ? 'text' : 'password'}
              id="outlined-adornment-confirm-password"
              value={formValues.confirmPassword}
              autoComplete="current-password"
              className='signin-confirm-password-field'
              color="grey"
              // focused
              onChange={handleFormChange}
              sx={{
                borderRadius: 1,
                backgroundColor: 'rgba(225, 225, 225)',
              }}
              InputProps={{
                endAdornment: <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle confirmed password visibility"
                    onClick={handleClickShowConfirmPassword}
                    onMouseDown={handleMouseDownConfirmedPassword}
                    edge="start"
                  >
                    {showConfirmedPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>,
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 4, mb: 3, backgroundColor: '#757ce8' }}
              
            >
              Create Account
            </Button>
            <Box className='separator-line'><span className='or-span'>OR</span></Box>
              <NavLink className='menu-item subtitle no-display-max' to='/signin'>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 2, mb: 1, backgroundColor: '#2dc14f' }}
                >
                  Already have an account ? Sign In
                </Button>
              </NavLink>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default SignUp;