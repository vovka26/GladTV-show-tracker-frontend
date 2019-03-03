import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

const LoadingImage = () => {
    return (
        <Dimmer active inverted>
            <Loader
                size='large'
                inverted
                content='Loading'
            />
        </Dimmer>
    )
}

export default LoadingImage;