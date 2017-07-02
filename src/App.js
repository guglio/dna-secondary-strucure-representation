import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import './App.css';
import Home from './Home.js'
import Header from './Header.js'
import DNAgraph from './DNAgraph.js'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header />
          <Route exact path="/" component={Home}/>
          <Route path="/:dna/:dbn" component={DNAgraph} />
        </div>
      </Router>
    );
  }
}

export default App;
