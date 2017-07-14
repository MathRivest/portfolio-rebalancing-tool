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
                    <li>Balancer current and new</li>
                    <li>Balancer total target, current, new</li>
                    <li>Set uniq securities state</li>
                    <li>Remove individual target</li>
                    <li>Balancer - balance All</li>
                    <ul>
                        <li>Order by price desc</li>
                        <li>for each security</li>
                        <li>if sumOfSameSecurity lower than target && hasMoneyLeft</li>
                        <li>add one</li>
                    </ul>
                    <li>Redo charts with recharts</li>
                    <li>Prevent too many rendering</li>
                    <li>Make intro banner / Onboarding</li>
                </ul>
            </div>
        );
    }
}

export default App;
