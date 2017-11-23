import React, { Component } from 'react';
import './App.css';

import Portfolio from './Portfolio/Portfolio';
import UserLogin from './User/UserLogin';

import { getCurrentUser } from '../Cognito';

import Wealthica from './Portfolio/Providers/wealthica';

import { Button, Popover } from './Components';

const Changelogs = () => {
    return (
        <div>
            <h3>What's new</h3>
            <ul>
                <li>
                    0.2.0
                    <ul>
                        <li>Add "What's new" popover</li>
                    </ul>
                </li>
                <li>
                    0.1.0
                    <ul>
                        <li>Replace axios with native fetch</li>
                        <li>Add onboarding and limitations</li>
                        <li>Add local storage</li>
                        <li>Improve rebalancing algo</li>
                        <li>New chart</li>
                        <li>Add cash in chart</li>
                    </ul>
                </li>
            </ul>
            <h3>Coming soon</h3>
            <ul>
                <li>Improve balancing algo by limiting distribution per account to target</li>
                <li>Domain name</li>
                <li>--Release--</li>
                <li>Transform everything to CAD using http://api.fixer.io/latest?base=CAD</li>
                <li>Prevent too many rendering</li>
            </ul>
        </div>
    );
};

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPopoverOpen: false,
            isLoggedIn: false,
            portfolioProvider: null
        };
    }

    handlePopoverClick = () => {
        this.setState({
            isPopoverOpen: !this.state.isPopoverOpen
        });
    };

    componentDidMount() {
        getCurrentUser((attributes, session) => {
            const accessToken = session.getIdToken().getJwtToken();
            const portfolioProvider = new Wealthica(accessToken);
            this.setState({
                isLoggedIn: true,
                portfolioProvider: portfolioProvider
            });
        });
    }

    renderView = () => {
        if (this.state.isLoggedIn && this.state.portfolioProvider) {
            return <Portfolio provider={this.state.portfolioProvider} />;
        } else {
            return <UserLogin />;
        }
    };

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <h2>Portfolio Rebalancing Tool</h2>
                    <div className="App-changelogs">
                        <Button variant="inverted" iconName="notifications" onClick={this.handlePopoverClick}>
                            What's new
                        </Button>
                        <Popover isOpen={this.state.isPopoverOpen}>
                            <Changelogs />
                        </Popover>
                    </div>
                </div>
                {this.renderView()}
            </div>
        );
    }
}

export default App;
