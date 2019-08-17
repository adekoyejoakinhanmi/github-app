import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import Users from './components/users/Users';
import Search from './components/users/Search';

import About from './components/pages/About';

import axios from 'axios';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import './App.css';

library.add(fab, faInfoCircle);
class App extends Component {
  state = {
    users: [],
    loading: false,
    alert: null
  }
  clearUsers = () => this.setState({ users: [], loading: false });
  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });
    setTimeout(() => this.setState({ alert: null }), 3000);
  }
  searchUser = async val => {
    const CLIENT_SECRET = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
    const CLIENT_ID = process.env.REACT_APP_GITHUB_CLIENT_ID;

    this.setState({ loading: true });
    const res = await axios.get(`https://api.github.com/search/users?q=${val}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`);
    this.setState({ users: res.data.items, loading: false });
  }
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Alert alert={this.state.alert} />
            <Switch>
              <Route exact path="/" render={props => (
                <Fragment>
                  <Search
                    searchUser={this.searchUser}
                    clearUsers={this.clearUsers}
                    setAlert={this.setAlert}
                    showClear={this.state.users.length ? true : false}
                  />
                  <Users loading={this.state.loading} users={this.state.users} />
                </Fragment>
              )} />
              <Route exact path="/about" component={About}/>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
