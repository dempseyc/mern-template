import {Action, Thunk} from 'easy-peasy'
import {action, thunk} from 'easy-peasy'
import axios from 'axios'

import { API2_URL} from '../../APP_CONSTANTS'
import { API2_KEY} from '../../APP_CONSTANTS'

interface QueryShape {
    query: string;
    page: number;
}

export interface MoviesModel {
    error: boolean;
    query: string;
    //tbd
    selection: any;
    loading: boolean;
    complete: boolean;
    pages: number;
    pageFetching: number;
    data: any[];
    setError: Action<MoviesModel, MoviesModel['error']>;
    setLoading: Action<MoviesModel, MoviesModel['loading']>;
    setPageFetching: Action<MoviesModel, MoviesModel['pageFetching']>;
    setData: Action<MoviesModel, any>;
    setQuery: Action<MoviesModel, MoviesModel['query']>;
    setSelection: Action<MoviesModel, MoviesModel['selection']>;
    submitQuery: Thunk<MoviesModel, QueryShape>;
}

export const movies: MoviesModel = {
    error: false,
    query: '',
    selection: null,
    loading: false,
    complete: false,
    pages: 0,
    pageFetching: 0,
    data: [],
    
    setError: action((state,payload) => { state.error = payload}),
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