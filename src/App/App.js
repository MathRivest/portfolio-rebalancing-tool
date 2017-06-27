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
                    <li>Fix graph redraw</li>
                    <li>Add color list</li>
                </ul>
            </div>
        );
    }
}

export default App;
