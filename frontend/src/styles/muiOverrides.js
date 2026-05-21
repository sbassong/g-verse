import { createTheme } from '@mui/material/styles';

const CustomizedInputsStyleOverrides = createTheme({
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            '--TextField-brandBorderColor': 'transparent',
            '--TextField-brandBorderHoverColor': 'transparent',
            '--TextField-brandBorderFocusedColor': 'transparent',
            '& label.Mui-focused': {
              color: '#fff',
            },
            '& label.MuiFormLabel-filled': {
              color: '#fff',
            },
            '& label.MuiFormLabel-asterisk': {
              color: '#fff',
            },
          },
        },
      },
      MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          fontSize: '1rem',
        },
      },
    },
    },
  });

export default CustomizedInputsStyleOverrides;