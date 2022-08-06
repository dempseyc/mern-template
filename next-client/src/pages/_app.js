import { StoreProvider } from 'easy-peasy'
import wrapper from '../../store';
import { useStore } from 'react-redux';
import { ThemeProvider } from "@mui/material";
import  theme  from "../theme";
import '../../styles/CSSreset.css'
import '../../styles/globals.css'
import '../../styles/App.scss'
import '../../styles/NavBar.scss'

function MyApp({ Component, pageProps }) {
  const store = useStore();
  return (
    <StoreProvider store={store}>
      <ThemeProvider theme={theme}>
      <Component {...pageProps} />
      </ThemeProvider>
    </StoreProvider>
  )
}

export default wrapper.withRedux(MyApp)
