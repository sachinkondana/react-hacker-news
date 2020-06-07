import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import HackerNews from './hackernews';

import './styles/common.module.scss';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/:page">
          <HackerNews/>
        </Route>
        <Redirect exact from="/" to="/0" />
      </Switch>
    </Router>
  );
}

export default App;
