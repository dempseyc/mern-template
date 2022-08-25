import { StoreProvider } from 'easy-peasy'
import wrapper from '../../store';
import { useStore } from 'react-redux';
import { ThemeProvider } from "@mui/material";
import  theme  from "../theme";
import '../../styles/CSSreset.css'
import '../../styles/globals.css'
import '../../styles/App.scss'
import '../../styles/NavBar.scss'
import Layout from '../components/SP_TAB_layout'


function MyApp({ Component, pageProps }) {
  const store = useStore();
  return (
    <StoreProvider store={store}>
      <ThemeProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </StoreProvider>
  )
}

export default wrapper.withRedux(MyApp)
