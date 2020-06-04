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
    const CLIENT_SECRET = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
    const CLIENT_ID = process.env.REACT_APP_GITHUB_CLIENT_ID;

    setLoading();
    const res = await axios.get(`https://api.github.com/search/users?q=${val}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`);
    dispatch({
      type: SEARCH_USERS,
      payload: res.data.items
    });
  }

   // clear ou
  const clearUsers = () => dispatch({ type: CLEAR_USERS })
  //
  const getUser = async username => {
    const CLIENT_SECRET = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
    const CLIENT_ID = process.env.REACT_APP_GITHUB_CLIENT_ID;

    dispatch({ type: SET_LOADING })
    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`);
    dispatch({
      type: GET_USER,
      payload: res.data
    })
  }
  //
  const getUserRepos = async username => {
    const CLIENT_SECRET = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
    const CLIENT_ID = process.env.REACT_APP_GITHUB_CLIENT_ID;
    
    dispatch({ type: SET_LOADING });

    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`);
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