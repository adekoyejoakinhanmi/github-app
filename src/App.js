import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';

import User from './components/users/User';

import About from './components/pages/About';
import Home from './components/pages/Home';
import Notfound from './components/pages/NotFound';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faInfoCircle, faCheck, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import './App.css';

import GithubState from './context/github/GithubState';
import AlertState from './context/alert/AlertState';

library.add(fab, faInfoCircle, faCheck, faTimesCircle);

const App = () => {
  return (
    <GithubState>
      <AlertState>
        <Router>
          <div className="App">
            <Navbar />
            <div className="container">
              <Alert alert={alert} />
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/about" component={About} />
                <Route exact path="/user/:login" component={User} /> 
                <Route component={Notfound} />
              </Switch>
            </div>
          </div>
        </Router>
      </AlertState>
    </GithubState>
  );
}

export default App;
