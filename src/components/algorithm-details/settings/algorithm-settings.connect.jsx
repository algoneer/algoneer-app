import React from 'react';
import AlogrithmSettings from './algorithm-settings.jsx';

const connect = () => (
    <AlogrithmSettings
        title={'This is the title.'}
        description={'This is the description'}
        onDelete={() => { }}
        onSave={() => {}}
    />
);

export default connect;
