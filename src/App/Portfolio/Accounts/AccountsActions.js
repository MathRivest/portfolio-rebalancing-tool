import React from 'react';
import { Button } from '../../Components';

class AccountsActions extends React.Component {
    render() {
        return (
            <div className="Accounts-actions">
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

export default AccountsActions;