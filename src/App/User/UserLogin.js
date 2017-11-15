import React from 'react';
import './UserLogin.css';
import wealthicaLogo from './logo-wealthica.svg';
import { Button, Card } from '../Components';
import { authenticateUser } from '../../Cognito';

class UserLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }

    authenticationCallback(err, result) {
        if (err) {
            console.log('Failed to authenticate', err);
        } else {
            console.log('Authentication successful', result);
        }
    }

    handleLoginSubmit = e => {
        e.preventDefault();
        authenticateUser(this.state.email, this.state.password, this.authenticationCallback);
    };

    handleEmailChange = e => {
        this.setState({ email: e.target.value });
    };

    handlePasswordChange = e => {
        this.setState({ password: e.target.value });
    };

    render() {
        return (
            <div className="UserLogin">
                <Card>
                    <div className="UserLogin-header">
                        <img src={wealthicaLogo} alt="Logo Wealthica" />
                        <h2>Login with Wealthica</h2>
                    </div>
                    <form className="UserLogin-content">
                        <div>
                            <label>Email:</label>
                            <input
                                value={this.state.email}
                                placeholder="Email or username"
                                type="text"
                                onChange={this.handleEmailChange}
                            />
                        </div>
                        <div>
                            <label>Password:</label>
                            <input
                                value={this.state.password}
                                placeholder="Password"
                                type="password"
                                minLength={6}
                                onChange={this.handlePasswordChange}
                            />
                        </div>
                        <div className="UserLogin-footer">
                            <Button type="submit" variant="primary" iconName="lock" onClick={this.handleLoginSubmit}>
                                Get Started
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        );
    }
}

export default UserLogin;
