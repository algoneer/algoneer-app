import React from 'react';
import { withActions } from '7s/components';

const Example = ({user}) => {
    return <div>
        <h1>User: {user.user.email}</h1>
    </div>;
};

export default withActions(Example, ['user']);
