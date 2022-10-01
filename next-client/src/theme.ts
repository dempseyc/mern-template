import { createTheme } from '@mui/material/styles'
import { blueGrey, grey } from '@mui/material/colors';

const theme = createTheme({
    palette: {
      secondary: blueGrey,
      primary: {
        main: grey[500],
      },
    },
    typography: {
      fontFamily: 'sans-serif',
      fontSize: 20,
    },
    components: {
      MuiButtonBase: {
        defaultProps: {
          disableRipple: true,
        },
      },
      MuiFab: {
        styleOverrides: {
          root: {
            width: '25%',
            fontSize: 15,
            margin: '0.5rem',
            padding: '0.5rem',
            label: {
                color: '#ffffff',
            },
          },
        }
      },
      MuiButton: {
        styleOverrides: {
          root: {
            margin: '0.1rem',
            ':focus': { //same as :hover
              webkitTextDecoration: 'none',
              textDecoration: 'none',
              backgroundColor: 'rgba(158, 158, 158, 0.04)',
              border: '1px solid #9e9e9e'
            },
            raisedPrimary: {
              color: blueGrey[800],
            },
            raisedSecondary: {
              color: grey[800],
            },
            outlinedPrimary: {
              color: grey[50],
            }
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: '#ffffffff',
            height: '100%',
          },
        },
      },
      MuiTabs: {
        styleOverrides: {
          root: {
            height: '100%',
            minHeight: '1em',
          },
          flexContainer: {
            height: '100%',
          },
          indicator: {
            backgroundColor: blueGrey[300],
            height: '4px',
            borderRadius: '2px 2px 0 0',
            // boxShadow: `0 0px 8px ${blueGrey[900]}`
          }
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            minHeight: '1em',
            "&.Mui-selected": {
              color: '#000000ff',
            },
            minWidth: '75px',

          },
        },
      },
      MuiDialogActions: {
        styleOverrides: {
          root: {
            margin: '8px 10px',
            marginBottom: '40px'
          },
        },
      },
      MuiSvgIcon: {
        styleOverrides: {
          root: {
            fontSize: 'inherit',
          }
        }
      }
    },
  });

  export default theme;