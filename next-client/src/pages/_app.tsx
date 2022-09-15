import { StoreProvider, Store } from 'easy-peasy'
import wrapper from '../store/store';
import { StoreModel } from '../store/store';
import { useStore } from 'react-redux';
// import { useStore } from 'easy-peasy';
import { ThemeProvider } from "@mui/material";
import  theme  from "../theme";
import '../../styles/CSSreset.css'
import '../../styles/globals.css'
import '../../styles/App.scss'
import '../../styles/NavBar.scss'


function MyApp({ Component, pageProps }) {
  const myStore = useStore();
  return (
    <StoreProvider store={myStore}> {/* tsx error, still works */}
      <ThemeProvider theme={theme}>
          <Component {...pageProps} />
      </ThemeProvider>
    </StoreProvider>
  )
}

export default wrapper.withRedux(MyApp)
