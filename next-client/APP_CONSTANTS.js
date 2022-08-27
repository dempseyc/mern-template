export const API_URL = (process.env.NODE_ENV !== 'production') ? process.env.REACT_APP_DEV_API_URL
  : process.env.REACT_APP_API_URL;

export const CABLE_URL = (process.env.NODE_ENV !== 'production') ? process.env.REACT_APP_DEV_CABLE_URL
  : process.env.REACT_APP_CABLE_URL



