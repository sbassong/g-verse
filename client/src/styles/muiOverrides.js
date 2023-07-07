
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
            '--TextField-brandBorderColor': '#2dc14f',
            '--TextField-brandBorderHoverColor': '#2dc14f',
            '--TextField-brandBorderFocusedColor': '#757ce8',
            '& label.Mui-focused': {
              color: '#fff',
            },
            '& label.MuiFormLabel-filled': {
              color: '#fff',
            },
            '& label.MuiFormLabel-asterisk': {
              // color: 'rgb(175, 175, 175)',
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