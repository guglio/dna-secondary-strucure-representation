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
          {/*
            To handle the share feature and to pass the dna and dbn sequence to DNAgraph component, I configured the roth path as '/:dna/:dbn', so it will be something like: <currPath>/ACTGGGG/.(...).

            TODO
            With longer sequence, it could be not the ideal link to share, I was thinking to encode the path on submit and than decode it to have the full sequence.
            One simple/possible implementation could be to create a sub string, for both the sequences, like this:
            <currPath>/ACTGGGG/.(...).
            <currPath>/A@C@T@4G/d@o@3d@c@d
            basically:
            if 1 repetition, just the base or dbn notation
            if > 1 n + notation
            for the dbn:
            . -> d -> dot
            ( -> o -> open bracket
            ) -> c -> close bracket
            */}
        </div>
      </Router>
    );
  }
}

export default App;
