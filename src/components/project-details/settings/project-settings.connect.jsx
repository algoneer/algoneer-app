import React from 'react';
import ProjectSettings from './project-settings.jsx';

const connect = () => (
    <ProjectSettings
        title={'This is the title.'}
        description={'This is the description'}
        onDelete={() => {}}
        onSave={() => { }}
        onUpdateDescription={() => { }}
        onUpdateTitle={() => { }}
    />
);

export default connect;
