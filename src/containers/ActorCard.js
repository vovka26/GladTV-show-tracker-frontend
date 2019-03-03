import React from 'react';
import { withRouter } from 'react-router-dom';
import { Card, Image } from 'semantic-ui-react';
import noActorImg from '../noImageActor.png';


const ActorCard = (props) => {
    const {actor} = props

    const onClick = (e, {actor, history}) => {
        history.push(`/actors/${actor.id}`)   
    }

    const imgSrc = actor.profile_path ? `https://image.tmdb.org/t/p/original/${actor.profile_path}` : noActorImg

    return (
        <Card 
            className='actor-card'
            onClick={(e) => onClick(e, props)}
        >
            <Image 
                src={imgSrc} 
                size='tiny'
            />
            <Card.Header>{actor.name}</Card.Header>
        </Card>
    )
}

export default withRouter(ActorCard);