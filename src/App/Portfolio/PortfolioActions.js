import React from 'react';
import { Button } from '../Components';

class PortfolioActions extends React.Component {
    render() {
        return (
            <div className="Portfolio-actions">
                <Button
                    variant="primary"
                    iconName="add"
                    size="lg"
                    onClick={this.props.onAccountAdd}>
                    Add account
                </Button>
            </div>
        )
    }
}

export default PortfolioActions;