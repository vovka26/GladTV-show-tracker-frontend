import React from 'react';
import { Image, Card } from 'semantic-ui-react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';

import * as actions from '../redux/actions';

const ShowCard = (props) => {
    const { show } = props
    return (
        <div className='movie-card'>
        <Card 
            onClick={() => {
                props.getShowDetails(show.id)
                props.clearSearchTerm()
                props.history.push(`/shows/${show.id}`)
            }}
        >
            <Card.Content>
                <Card.Header>{show.name}</Card.Header>
            </Card.Content>
            <Image src={`https://image.tmdb.org/t/p/w200/${show.poster_path}`} />
        </Card> 
        </div>
    )
}

export default withRouter(connect(null, actions)(ShowCard));