import {Action, Thunk} from 'easy-peasy'
import {action, thunk} from 'easy-peasy'
import axios from 'axios'

const API_URL = '/';

export interface UsersModel {
    ready: boolean;
    loggedIn: boolean;
    loading: boolean;
    error: boolean;
    // tbd
    user: any;
    // tbd
    credentials: any;
    messages: string[];
    setLoading: Action<UsersModel, boolean>;
    setUser: Action<UsersModel, any>;
    setReady: Action<UsersModel, boolean>;
    setCredentials: Action<UsersModel, any>;
    setError: Action<UsersModel, boolean>;
    fetchUser: Thunk<UsersModel, any>;
    createUser: Thunk<UsersModel, any>;
    loginUser: Thunk<UsersModel, any>;
    setMessages: Action<UsersModel, string>;
    storeToken: Action<UsersModel, any>;
    logoutUser: Action<UsersModel>;
    authFB: Thunk<UsersModel, any>;
}

export const users: UsersModel = {
    ready: false,
    loggedIn: false,
    loading: false,
    error: false,
    user: {},
    credentials: {},
    messages: [],
  
    setLoading: action((state,payload) => {state.loading = payload}),
    setUser: action((state,payload) => {state.user = payload}),
    setReady: action((state,payload) => {state.ready = payload}),
    setCredentials: action((state,payload) => {state.credentials = payload}),
    setError: action((state,payload) => {state.error = payload}),
  
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
          headers: {
            'Authorization': basicAuth,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          }
        });
        actions.storeToken(response.data);
        actions.fetchUser(null);
      } catch (error) {
        console.log(error)
        actions.setMessages(error.response.data.message);
        actions.setError(true);
      } finally {
        actions.setLoading(false);
      }
    }),
  
    setMessages: action((state,payload) => {
      state.messages = [...state.messages, payload]
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