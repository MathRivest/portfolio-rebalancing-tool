import React, { Component } from 'react';
import './App.css';

import Portfolio from './Portfolio/Portfolio';

class App extends Component {

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <h2>Portfolio Rebalancing Tool</h2>
                </div>

                <Portfolio/>

                <h1>Todo:</h1>
                <ul>
                    <li>Add button styles</li>
                    <li>Prevent too many rendering</li>
                    <li>Use rechart instead</li>
                    <li>Make intro banner / Onboarding</li>
                </ul>
            </div>
        );
    }
}

export default App;
