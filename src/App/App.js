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

                Portfolio todo:
                <ul>
                    <li>Fix last delete</li>
                    <li>Fix set color on add</li>
                    <li>Adjust header</li>
                    <li>Make intro banner</li>
                </ul>
            </div>
        );
    }
}

export default App;
