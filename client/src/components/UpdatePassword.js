import '../styles/SignIn.css'
import React, {useState} from 'react';
import { useNavigate } from "react-router";
import { UpdateUserPassword } from '../services/UserServices'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles'
import CustomizedInputsStyleOverrides from '../styles/muiOverrides';


const UpdatePassword = ({user, setUser}) => {
  const navigate = useNavigate();
  const iState = { oldPassword: '', newPassword: '', c_newPassword: '' };
  const [formValues, setFormValues] = useState(iState);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedUser = await UpdateUserPassword(user?.id, formValues);
    setFormValues(iState);
    await setUser(updatedUser);
    navigate('/user/account');
  };

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
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
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>

            <TextField
              margin="normal"
              fullWidth
              id="password"
              label="Previous password"
              onChange={handleChange}
              name="oldPassword"
              placeholder="Previous password"
              value={formValues.oldPassword}
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
              name="c_newPassword"
              placeholder="Confirm new password"
              value={formValues.c_newPassword}
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