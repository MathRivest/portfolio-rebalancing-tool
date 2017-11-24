import React from 'react';

import './Intro.css';

import UserLogin from '../User/UserLogin';
import { Button, Card } from '../Components';

class Intro extends React.Component {
    handleStartClick = () => {
        this.props.onStart({ provider: null });
    };

    handleOnLogin = () => {
        this.props.onStart({ provider: 'null' });
    };

    render(props) {
        return (
            <div className="Intro">
                <Card>
                    <div className="Intro-body">
                        <div className="Intro-body-content">
                            <Button variant="primary" onClick={this.handleStartClick}>
                                Add your own
                            </Button>
                        </div>
                        <UserLogin />
                    </div>
                </Card>
            </div>
        );
    }
}

export default Intro;
