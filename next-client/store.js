import { createStore, action, actionOn, thunk } from 'easy-peasy'
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import axios from 'axios'

import { API_URL} from './APP_CONSTANTS'
import { API2_URL} from './APP_CONSTANTS'
import { API2_KEY} from './APP_CONSTANTS'

// const SSR_HYDRATE = actionOn(
//   () => HYDRATE,
//   (state,target) => {
//     state.count = target.payload.count;
//   }
// )

// const reducer = (state, action) => {
//   if (action.type === HYDRATE) {
//     const nextState = {
//       ...state, // use previous state
//       ...action.payload, // apply delta from hydration
//     };
//     if (state.count) nextState.count = state.count; // preserve count value on client side navigation
//     return nextState;
//   } else {
//     return combinedReducer(state, action);
//   }
// };

const config = {
  HOME_VIEWS: ['main','chat','user','more']
}

const users = {
  ready: false,
  loggedIn: false,
  loading: false,
  error: false,
  user: {},
  usersList: [],
  credentials: {},
  messages: [],

  setLoading: action((state,payload) => {state.loading = payload}),
  setUser: action((state,payload) => {state.user = payload}),
  setReady: action((state,payload) => {state.ready = payload}),
  setCredentials: action((state,payload) => {state.credentials = payload}),
  setError: action((state,payload) => {state.error = payload}),
  setUsersList: action((state,payload) => {state.usersList = payload}),

  // fetchUserList: thunk(async (actions) => {

  // })

  fetchUser: thunk(async (actions) => {
    const token = localStorage.token;
    const id = localStorage.id;
    const url = `${API_URL}api/users/${id}`;
    actions.setLoading(true);
    try {
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      actions.setUser(response.data);
      actions.setReady(true);
    } catch (error) {
      actions.setError(true);
    } finally {
      actions.setLoading(false);
    }
  }),

  createUser: thunk(async (actions,payload) => {
    const url = `${API_URL}api/users/create`;
    try {
      const response = await axios.post(url, {
            user: {
                email: payload.email,
                password: payload.password
            }
      });
      // give message user created, logging in
      actions.loginUser(payload);
    } catch (error) {
      actions.setError(true);
    } finally {
      actions.setLoading(false);
    }
  }),

  loginUser: thunk(async (actions,payload) => {
    console.log(payload);
    actions.setCredentials(payload);
    // should use Buffer.from(str, 'base64');
    const basicAuth = 'Basic ' + btoa(payload.email + ':' + payload.password);
    let url = `${API_URL}api/auth/login`;
    try {
      const response = await axios.post(url, {}, {
        headers: {'Authorization': basicAuth} 
      });
      actions.storeToken(response.data);
      actions.fetchUser();
    } catch (error) {
      actions.setError(true);
    } finally {
      actions.setLoading(false);
    }
  }),

  storeToken: action((state,payload) => {
    localStorage.setItem('token',payload.token);
    localStorage.setItem('id',payload.user_id);
    localStorage.setItem('method', payload.method);
    state.loggedIn = true;
  }),

  logoutUser: action((state,payload) => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    //unsubscribe chat channel
    state.user = {};
    state.loggedIn = false;
    state.ready = false;
    state.messages = [`${state.credentials.email} logged out`]
    state.credentials = {};
  }),

  authFB: thunk( async(actions, payload) => {
    const token = localStorage.token;
    const id = localStorage.id;
    const url = `${API_URL}api/auth/fb`
    try {
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      console.log(response);
    } catch (error) {
      actions.setError(true);
    } finally {
      actions.setLoading(false);
    }
  }),
};

const movies = {
  error: false,
  query: '',
  selection: null,
  loading: false,
  complete: false,
  pages: 0,
  pageFetching: 0,
  data: [],
  
  setLoading: action((state,payload) => { state.loading = payload}),
  setPageFetching: action((state,payload) => { state.pageFetching = payload}),
  setData: action((state,payload) => { 
    state.data = [...state.data, ...payload.results];
    state.pages = payload.total_pages ;
  }),
  setQuery: action((state,payload) => { state.query = payload}),
  setSelection: action((state,payload) => { state.selection = payload.selection}), // also has index
  submitQuery: thunk(async (actions,payload) => {
    const {query,page} = payload;
    const queryEnc = encodeURI(query);
    const url = `${API2_URL}search/movie?api_key=${API2_KEY}&language=en-US&query=${queryEnc}&page=${page}`
    actions.setQuery(query);
    actions.setLoading(true);
    actions.setPageFetching(page);
    try {
      const response = await axios.get(url);
      actions.setData(response.data);
    } catch (error) {
      actions.setError(true);
    } finally {
      actions.setLoading(false);
    }
  })
}

const store = {
  config,
  currView: 2,
  setCurrView: action((state, payload) => { state.currView = payload.index }),
  movies,
  users,
}

const initStore = () => {
  return createStore(store);
}

const wrapper = createWrapper(initStore);

export default wrapper