import React, { Component } from 'react';
import './App.css';

import Portfolio from './Portfolio/Portfolio';

const Changelogs = () => {
    return(
        <div style={{
            'padding': '0 24px'
        }}>
            <h2>ChangeLogs:</h2>
            <ul>
                <li>
                    3.0.2
                    <ul>
                        <li>Add local storage</li>
                    </ul>
                </li>
                <li>
                    3.0.1
                    <ul>
                        <li>New charts</li>
                        <li>Add cash in charts</li>
                    </ul>
                </li>
            </ul>
            <h2>Todo</h2>
            <ul>
                <li>Improve rebalancing algo</li>
                <li>Limit buyQty to not go negative money</li>
                <li>Prevent too many rendering</li>
                <li>Make intro banner / Onboarding</li>
            </ul>
        </div>
    )
}


class App extends Component {

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <h2>Portfolio Rebalancing Tool</h2>
                    <div>Version 3.0.1</div>
                </div>

                <Portfolio/>
                <Changelogs/>
            </div>
        );
    }
}

export default App;
