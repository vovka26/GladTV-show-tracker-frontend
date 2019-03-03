import React from 'react';
import { connect } from 'react-redux';
import ActorCard from './ActorCard';

const ActorsList = ({actorsList}) => {
    return ( 
        <div className='ui grid actors-list'>
            {actorsList.map(actor => (
                <ActorCard 
                    key={actor.id}
                    actor={actor}
                />
            ))}
        </div>
    )
}

const mapStateToPtops = state => {
    return {
        actorsList: state.showDetails.credits.cast
    }
}


export default connect(mapStateToPtops)(ActorsList);