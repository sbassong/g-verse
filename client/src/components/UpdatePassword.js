import '../styles/SignIn.css'
import React, { useState, useContext } from 'react';
import { UpdateUserPassword } from '../services/UserServices'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles'
import CustomizedInputsStyleOverrides from '../styles/muiOverrides';
import { UserContext } from "../utils";


const UpdatePassword = ({ setUser, handleSnack, setAccountUpdated, setForm}) => {
  const authenticatedUser = useContext(UserContext);
  const iState = { newPassword: '', confirmedPassword: '' };
  const [formValues, setFormValues] = useState(iState);
  
  const handleChange = (e) => setFormValues({ ...formValues, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formValues.newPassword !== formValues.confirmedPassword) {
      const message = 'Error: Passwords must match';
      handleSnack(message, 'error');
      setFormValues(iState);
      return;
    }

    const updatedUser = await UpdateUserPassword(authenticatedUser?.id, formValues);
    if (authenticatedUser?.email) {
      const successMsg = 'Success: Password updated'
      await setUser(updatedUser);
      setForm(null);
      setAccountUpdated(true);
      handleSnack(successMsg, 'success');
    } else {
      const errorMsg = 'Error: No user matches credentials'
      handleSnack(errorMsg, 'error');
    }
    setFormValues(iState);
  };
  
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
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>

            <TextField
              margin="normal"
              fullWidth
              required
              id="password"
              label="New password"
              onChange={handleChange}
              name="newPassword"
              placeholder="New password"
              value={formValues.newPassword}
              className='signin-email-field'
              sx={{
                borderRadius: 1,
                backgroundColor: 'rgba(225, 225, 225)',
              }}
            />

            <TextField
              margin="normal"
              fullWidth
              required
              id="password"
              label="Confirm password"
              onChange={handleChange}
              name="confirmedPassword"
              placeholder="Confirm new password"
              value={formValues.confirmedPassword}
              className='signin-email-field'
              sx={{
                borderRadius: 1,
                backgroundColor: 'rgba(225, 225, 225)',
              }}
            />

            <Button
              type="submit"
              fullWidth
              required
              variant="contained"
              sx={{ mt: 4, mb: 3, backgroundColor: '#757ce8' }}
            >
              Update Password
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default UpdatePassword;