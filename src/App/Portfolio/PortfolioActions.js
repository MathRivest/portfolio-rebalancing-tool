import React from 'react';
import { Button } from '../Components';

class PortfolioActions extends React.Component {
    render() {
        return (
            <ul className="Portfolio-actions">
                <li>
                    <Button
                        variant="primary"
                        iconName="add"
                        onClick={this.props.onAccountAdd}>
                        Add Account
                    </Button>
                </li>
            </ul>
        )
    }
}

export default PortfolioActions;