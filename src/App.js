import React, { useState, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';

import Users from './components/users/Users';
import Search from './components/users/Search';
import User from './components/users/User';

import About from './components/pages/About';

import axios from 'axios';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faInfoCircle, faCheck, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import './App.css';

library.add(fab, faInfoCircle, faCheck, faTimesCircle);
const App = () => {
  const [users, setUsers] = useState([]);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const [alert, setStateAlert] = useState(null);

  // clear ou
  const clearUsers = () => {
    setUsers([]);
    setLoading(false);
  };
  // 
  const setAlert = (msg, type) => {
    setStateAlert({ msg, type });
    setTimeout(() => {
      setStateAlert(null);
    }, 3000);
  }
  //
  const getUser = async username => {
    const CLIENT_SECRET = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
    const CLIENT_ID = process.env.REACT_APP_GITHUB_CLIENT_ID;

    setLoading(true);
    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`);
    setUser(res.data);
    setLoading(false);
  }
  //
  const getUserRepos = async username => {
    const CLIENT_SECRET = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
    const CLIENT_ID = process.env.REACT_APP_GITHUB_CLIENT_ID;

    setLoading(true);
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`);
    setRepos(res.data);
    setLoading(false);
  }
  // search for users
  const searchUser = async val => {
    const CLIENT_SECRET = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
    const CLIENT_ID = process.env.REACT_APP_GITHUB_CLIENT_ID;

    setLoading(true);
    const res = await axios.get(`https://api.github.com/search/users?q=${val}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`);
    setUsers(res.data.items);
    setLoading(false);
  }
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container">
          <Alert alert={alert} />
          <Switch>
            <Route exact path="/" render={props => (
              <Fragment>
                <Search
                  searchUser={searchUser}
                  clearUsers={clearUsers}
                  setAlert={setAlert}
                  showClear={users.length ? true : false}
                />
                <Users loading={loading} users={users} />
              </Fragment>
            )} />
            <Route exact path="/about" component={About} />
            <Route exact path="/user/:login" render={props => (
              <User
                {...props}
                getUser={getUser}
                getUserRepos={getUserRepos}
                user={user}
                repos={repos}
                loading={loading}
              />
            )}/> 
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
