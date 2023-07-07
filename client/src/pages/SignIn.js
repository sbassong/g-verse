import React, {useState} from 'react';
import { NavLink } from 'react-router-dom'
import '../styles/SignIn.css'
import { SignInUser } from '../services/UserServices'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CustomizedInputsStyleOverrides from '../styles/muiOverrides';


const SignIn = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [hoverEmailColor, setHoverEmailColor] = useState('rgba(225, 225, 225)')
  const [hoverPasswordColor, setHoverPasswordColor] = useState('rgba(225, 225, 225)')
  const [formValues, setFormValues] = useState({ email: '', password: '' })

  const handleFormChange = (e) => setFormValues({ ...formValues, [e.target.name]: e.target.value });
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();

    const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = await SignInUser(formValues)
    setFormValues({ email: '', password: '' })
    props.setUser(payload)
    props.toggleAuthenticated(true)
    props.history.push('/')
  }


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
              value={formValues.email}
              onChange={handleFormChange}
              autoComplete="email"
              autoFocus
              className='signin-email-field'
              sx={{
                borderRadius: 1,
                backgroundColor: hoverEmailColor,
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
                backgroundColor: hoverPasswordColor,
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