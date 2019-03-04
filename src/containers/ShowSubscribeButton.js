import React from 'react';
import { Button } from 'semantic-ui-react';

const ShowSubscribeButton = (props) => {
    return (
        <Button
            className={props.className}
            animated='fade'
            onClick={(e) => props.onButtonClick(e, props)}
        >
            <Button.Content 
                visible 
                content={props.show.name}
            />
            <Button.Content 
                hidden 
                content={props.buttonContent}
            />
                
            
        </Button >
    )
}

export default ShowSubscribeButton;