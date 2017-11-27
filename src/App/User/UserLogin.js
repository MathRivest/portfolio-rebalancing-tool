import React from 'react';
import './UserLogin.css';
import wealthicaLogo from './logo-wealthica.svg';
import { Button } from '../Components';
import { authenticateUser } from '../../Cognito';

class UserLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isLoading: false
        };
    }

    authenticationCallback = (err, result) => {
        this.setState({ isLoading: false });
        if (err) {
            console.log('Failed to authenticate', err);
        } else {
            this.props.onLogin();
        }
    };

    handleLoginSubmit = e => {
        e.preventDefault();
        this.setState({ isLoading: true });
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
                <div className="UserLogin-header">
                    <img src={wealthicaLogo} alt="Logo Wealthica" />
                    <h2>Login with Wealthica</h2>
                </div>
                <form>
                    <div className="FormElement">
                        <label>Email:</label>
                        <input
                            value={this.state.email}
                            placeholder="Email or username"
                            type="text"
                            onChange={this.handleEmailChange}
                        />
                    </div>
                    <div className="FormElement">
                        <label>Password:</label>
                        <input
                            value={this.state.password}
                            placeholder="Password"
                            type="password"
                            minLength={6}
                            onChange={this.handlePasswordChange}
                        />
                        <small className="FormElement-help">
                            <a href="https://app.wealthica.com/recover-password">Forgot password?</a>
                        </small>
                    </div>
                    <div className="UserLogin-footer">
                        <small className="FormElement-help">
                            <a href="https://app.wealthica.com/sign-up" target="_blank">
                                No account? Sign up here.
                            </a>
                        </small>
                        <Button
                            disable={this.state.isLoading}
                            type="submit"
                            variant="primary"
                            iconName="lock"
                            onClick={this.handleLoginSubmit}
                        >
                            {this.state.isLoading ? 'Loading...' : 'Get Started'}
                        </Button>
                    </div>
                </form>
            </div>
        );
    }
}

export default UserLogin;
