import React, { useReducer } from 'react'
import axios from 'axios'
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';

import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS
} from '../types';
 
const notProd = process.env.NODE_ENV !== 'production';
const CLIENT_ID = notProd ? process.env.REACT_APP_GITHUB_CLIENT_ID : process.env.GITHUB_CLIENT_ID;
const CLIENT_SECRET = notProd ? process.env.REACT_APP_GITHUB_CLIENT_SECRET : process.env.GITHUB_CLIENT_SECRET;

const auth = {
  username: CLIENT_ID,
  password: CLIENT_SECRET
}

const GithubState = props => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false
  }
  const [state, dispatch] = useReducer(GithubReducer, initialState);
  const setLoading = () => dispatch({ type: SET_LOADING });

  // search for users
  const searchUsers = async val => {
    setLoading();
    const res = await axios({
      method: 'get',
      url: `https://api.github.com/search/users?q=${val}`,
      auth
    });
    dispatch({
      type: SEARCH_USERS,
      payload: res.data.items
    });
  }

   // clear ou
  const clearUsers = () => dispatch({ type: CLEAR_USERS })
  //
  const getUser = async username => {
    dispatch({ type: SET_LOADING })
    const res = await axios({
      method: 'GET',
      url: `https://api.github.com/users/${username}`,
      auth
    });
    dispatch({
      type: GET_USER,
      payload: res.data
    })
  }
  //
  const getUserRepos = async username => {
    dispatch({ type: SET_LOADING });

    const res = await axios({
      method: 'GET',
      url: `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc`,
      auth
    });
    dispatch({
      type: GET_REPOS,
      payload: res.data
    });
  }
  return <GithubContext.Provider
    value={{
      users: state.users,
      user: state.user,
      repos: state.repos,
      loading: state.loading,
      showClear: state.users.length > 0,
      searchUsers,
      clearUsers,
      getUserRepos,
      getUser
    }}
  >
    {props.children}
  </GithubContext.Provider>
}
 
export default GithubState;