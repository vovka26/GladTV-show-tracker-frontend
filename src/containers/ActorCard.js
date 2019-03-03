import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import noActorImg from '../noImageActor.png'


const ActorCard = ({actor}) => {
    return (
        <Card className='actor-card'>
            <Image 
                src={actor.profile_path ? `https://image.tmdb.org/t/p/original/${actor.profile_path}` : noActorImg} 
                size='tiny'
            />
            <Card.Header>{actor.name}</Card.Header>
        </Card>
    )
}

export default ActorCard;