import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Portfolio from './Portfolio/Portfolio';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Portfolio Rebalancing Tool</h2>
        </div>
        <Portfolio/>

        Portfolio todo:
        <ul>
            <li>Add Button component and all icons</li>
            <li>Add graphs</li>
            <li>Redux?</li>
        </ul>
      </div>
    );
  }
}

export default App;
