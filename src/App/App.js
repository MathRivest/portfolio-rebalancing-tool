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
                    <li>Add account</li>
                    <li>Name account</li>
                    <li>Delete account</li>
                    <li>Use rechart instead</li>
                    <li>Make intro banner</li>
                </ul>
            </div>
        );
    }
}

export default App;
