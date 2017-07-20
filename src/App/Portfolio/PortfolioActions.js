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
                        size="lg"
                        onClick={this.props.onAccountAdd}>
                        Add account
                    </Button>
                </li>
                <li>
                    <Button
                        variant="primary"
                        iconName="donut_large"
                        size="lg"
                        onClick={this.props.onAccountsBalance}>
                        Balance
                    </Button>
                </li>
            </ul>
        )
    }
}

export default PortfolioActions;