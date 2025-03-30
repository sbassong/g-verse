import '../styles/SignIn.css'
import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom'
import { useNavigate } from "react-router";
import { ThemeProvider } from '@mui/material/styles';
import { Avatar, Button, TextField, IconButton, Box, Typography, Container, InputAdornment, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CustomizedInputsStyleOverrides from '../styles/muiOverrides';
import { SignInUser } from '../services/UserServices'


const iState = { email: '', password: '' };

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SignIn = ({ setUser, authenticated, toggleAuthenticated }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState(iState);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState(null);
  const [snackSeverity, setSnackSeverity] = useState(null);
  const [loggedUser, setLogged] = useState();

  const handleFormChange = (e) => setFormValues({ ...formValues, [e.target.name]: e.target.value });
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();
  const handleShowSnack = () => setSnackOpen(true);
  const handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = await SignInUser(formValues);
    if (payload?.email) {
      setUser(payload);
      setLogged(payload)
      localStorage.setItem('gverse-authenticated', '1');
      toggleAuthenticated(true);
      navigate(`/user/${payload.id}/profile`);
    } else {
      setSnackMessage(payload);
      setSnackSeverity('error');
      handleShowSnack();
      setFormValues(iState);
    }
  };


  // if (authenticated) return <Navigate to={`/user/${loggedUser?.id}/profile`} state={{ from: location }} replace />
  return (
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
            borderRadius: 2,
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

      </Container>
    </ThemeProvider>
  );

}

export default SignIn;