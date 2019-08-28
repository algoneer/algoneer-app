import React from 'react';
import ProjectSettings from './project-settings.jsx';

const connect = ({id}) => (
    <ProjectSettings
        title={'This is the title.'}
        id={id}
        description={'This is the description'}
        onDelete={() => {}}
        onSave={() => { }}
        onUpdateDescription={() => { }}
        onUpdateTitle={() => { }}
    />
);

export default connect;
