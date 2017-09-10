import React, { Component } from 'react';
import './App.css';

import Portfolio from './Portfolio/Portfolio';

const Changelogs = () => {
    return(
        <div style={{
            'padding': '0 24px'
        }}>
            <h2>Changelogs:</h2>
            <ul>
                <li>
                    3.0.3
                    <ul>
                        <li>Replace axios with native fetch</li>
                    </ul>
                </li>
                <li>
                    3.0.2
                    <ul>
                        <li>Add local storage</li>
                        <li>Improve rebalancing algo</li>
                    </ul>
                </li>
                <li>
                    3.0.1
                    <ul>
                        <li>New chart</li>
                        <li>Add cash in chart</li>
                    </ul>
                </li>
            </ul>
            <h2>Todo</h2>
            <ul>
                <li>Add dismissible message box</li>
                <li>Add onboarding (localstorage, CAD, )</li>
                <li>Add Limitations (currency)</li>
                <li>Change changelogs to "What's new" popover</li>
                <li>Domain name</li>
                <li>Improve balancing algo by limiting distribution per account to target</li>
                <li>Prevent too many rendering</li>
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
                    <div>Version 3.0.3</div>
                </div>

                <Portfolio/>
                <Changelogs/>
            </div>
        );
    }
}

export default App;
