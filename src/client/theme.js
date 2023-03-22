import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      light: '#f6685e',
      main: '#f44336',
      dark: '#aa2e25',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ffcf33',
      main: '#ffc400',
      dark: '#b28900',
      contrastText: '#000',
    },
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '*': {
          'scrollbar-width': 'thin',
        },
        '*::-webkit-scrollbar': {
          width: '0px',
          height: '4px',
        },
        '*::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(0,0,0,.1)',
          outline: '1px solid slategrey',
        },
      },
    },
  },
  background: {
    default: '#e8e8e851',
  },
});

export default theme;

// import { createTheme } from '@material-ui/core/styles';
// import red from '@material-ui/core/colors/red';
// import orange from '@material-ui/core/colors/orange';

// const theme = createTheme({
//   palette: {
//     type: 'dark',
//     primary: red,
//     secondary: orange,
//   },
//   overrides: {
//     MuiCssBaseline: {
//       '@global': {
//         '*': {
//           'scrollbar-width': 'thin',
//         },
//         '*::-webkit-scrollbar': {
//           width: '0px',
//           height: '4px',
//         },
//         '*::-webkit-scrollbar-thumb': {
//           backgroundColor: 'rgba(0,0,0,.1)',
//           outline: '1px solid slategrey',
//         },
//       },
//     },
//   },
//   background: {
//     default: '#e8e8e851',
//   },
// });

// export default theme;
