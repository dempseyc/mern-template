import {Action, Thunk} from 'easy-peasy'
import {action, thunk} from 'easy-peasy'
import axios from 'axios'

const API2_URL = '/api/movies/'

interface QueryShape {
    text: string;
    page: number;
}

export interface MoviesModel {
    error: boolean;
    query: QueryShape;
    //tbd
    selection: any;
    loading: boolean;
    complete: boolean;
    pages: number;
    data: any[];
    setError: Action<MoviesModel, MoviesModel['error']>;
    setLoading: Action<MoviesModel, MoviesModel['loading']>;
    setData: Action<MoviesModel, any>;
    setQuery: Action<MoviesModel, QueryShape>;
    setSelection: Action<MoviesModel, MoviesModel['selection']>;
    submitQuery: Thunk<MoviesModel, QueryShape>;
}

export const movies: MoviesModel = {
    error: false,
    query: {text:'',page:-1},
    selection: null,
    loading: false,
    complete: false,
    pages: 0,
    data: [],
    
    setError: action((state,payload) => { state.error = payload}),
    setLoading: action((state,payload) => { state.loading = payload}),
    setData: action((state,payload) => { 
      state.data = [...state.data, ...payload.results];
      state.pages = payload.total_pages ;
    }),
    setQuery: action((state,payload) => { state.query = payload}),
    setSelection: action((state,payload) => { state.selection = payload.selection}), // also has index
    submitQuery: thunk(async (actions,payload) => {
      const {text,page} = payload;
      const queryEnc = encodeURI(text);
      // const url = `${API2_URL}search/movie?api_key=${API2_KEY}&language=en-US&query=${queryEnc}&page=${page}`
      const url = `${API2_URL}&query=${queryEnc}&page=${page}`
      actions.setQuery({text:text,page:page});
      actions.setLoading(true);
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