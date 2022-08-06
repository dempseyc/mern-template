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
      useNextVariants: true,
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
          },
          label: {
              color: '#ffffff',
          },
        }
      },
      MuiButton: {
        styleOverrides: {
          root: {
            margin: '0.1rem',
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
      MuiPrivateTabIndicator: {
        styleOverrides: {
          root: {
            boxShadow: '0 0 0.25rem 0.25rem #1de9b660',
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
            backgroundColor: blueGrey[100],
            height: '3px',
            boxShadow: `0 -1px 8px ${blueGrey[100]}`
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
      // MuiSvgIcon: {
      //   styleOverrides: {
      //     root: {
      //     },
      //   },
      // },
    },
  });

  export default theme;