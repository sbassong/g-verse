import '../styles/SignIn.css'
import React, {useState} from 'react';
import { UpdateUser } from '../services/UserServices'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles'
import CustomizedInputsStyleOverrides from '../styles/muiOverrides';


const UpdateProfile = ({user, setUser, setAccountUpdated, handleSnack, setForm}) => {
  const iState = { name: '', email: '', image: '' };
  const [formValues, setFormValues] = useState(iState);

  const handleChange = (e) => setFormValues({ ...formValues, [e.target.name]: e.target.value });
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payloadValues = formValues;
    if (!payloadValues.name) payloadValues.name = user.name;
    if (!payloadValues.email) payloadValues.email = user.email;
    if (!payloadValues.image) payloadValues.image = user.image;

    const updatedUser = await UpdateUser(user?.id, payloadValues);
    if (updatedUser?.email) {
      const successMsg = 'Success: User profile updated!'
      await setUser(updatedUser);
      setForm(null);
      setAccountUpdated(true);
      handleSnack(successMsg, 'success')
    } else {
      handleSnack(updatedUser, 'error');
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
              id="name"
              label="Account Name"
              name="name"
              placeholder="Firstname Lastname"
              value={formValues.name}
              onChange={handleChange}
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
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              placeholder="firstname@email.com"
              value={formValues.email}
              onChange={handleChange}
              autoComplete="email"
              className='signin-email-field'
              sx={{
                borderRadius: 1,
                backgroundColor: 'rgba(225, 225, 225)',
              }}
              />

            <TextField
              margin="normal"
              fullWidth
              name="image"
              placeholder="www.imgurl.jpg, png..."
              label="Avatar url"
              id="text"
              value={formValues.image}
              className='signin-password-field'
              color="grey"
              onChange={handleChange}
              sx={{
                borderRadius: 1,
                backgroundColor: 'rgba(225, 225, 225)',
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 4, mb: 3, backgroundColor: '#757ce8' }}
              disabled={!formValues.name && !formValues.email && !formValues.image}
            >
              Update Profile
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default UpdateProfile;