import React from 'react'
import {render} from 'react-dom'
import { Provider } from 'react-redux'
import App from './components/App'

// import { applyMiddleware } from 'redux'
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"
// import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import rootReducer from './reducers'

const logger = createLogger();
const middleware = [...getDefaultMiddleware(),logger];

const preloadedState = {
  todos: [
    {
      text: 'Eat food',
      completed: true,
      id: 0
    },
    {
      text: 'Exercise',
      completed: false,
      id: 1
    }
  ],
}

const store = configureStore({
    reducer: rootReducer,
    middleware,
    preloadedState,
});

const Root = () => (
  <Provider store={store}>
  {/* <MuiThemeProvider theme={theme}> */}
    <App />
  {/* </MuiThemeProvider> */}
  </Provider>
);

render(<Root />, document.getElementById('root'));
