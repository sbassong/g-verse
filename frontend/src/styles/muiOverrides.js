
import * as React from 'react';
import TextField from '@mui/material/TextField';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';

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