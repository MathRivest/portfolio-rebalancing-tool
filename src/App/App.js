import React, { Component } from 'react';
import './App.css';

import Portfolio from './Portfolio/Portfolio';

class App extends Component {

    render() {
        const colorList = [
            '#8055fc',
            '#b44ffc',
            '#df38fd',
            '#ff27eb',
            '#fc4b87',
            '#f54b52',
            '#fc6529',
            '#fa8e22',
            '#fcdb29',
            '#fbfe2f',
            '#8cfd2a',
            '#04fc3a',
            '#13db90',
            '#29eae9',
            '#2fc8fd',
            '#4c80fc',
            '#8055fc',
            '#b44ffc',
            '#df38fd',
            '#ff27eb',
            '#fc4b87'
        ];
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
