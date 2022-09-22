import { StoreProvider, Store } from 'easy-peasy'
import { StoreModel } from '../store/store';
import { Provider } from 'react-redux'
import { store } from '../store/store'
import {wrapper} from '../store/store';
// import { useStore } from 'react-redux';
import { useStore } from 'easy-peasy';
import { ThemeProvider } from "@mui/material";
import  theme  from "../theme";
import '../../styles/CSSreset.css'
import '../../styles/globals.css'
import '../../styles/App.scss'
import '../../styles/NavBar.scss'

const StoreProviderOverride = StoreProvider as any;

function MyApp({ Component, pageProps }) {
  // const myStore: Store<StoreModel> = useStore();
  return (
      <StoreProviderOverride store={store}>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </StoreProviderOverride>
  )
}

export default wrapper.withRedux(MyApp)
// export default MyApp
