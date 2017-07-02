import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import './App.css';
import Home from './Home.js'
import Header from './Header.js'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header />
          <Route path="/" component={Home}/>
        </div>
      </Router>
    );
  }
}

export default App;
