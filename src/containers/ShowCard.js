import React from 'react';
import { Image, Card } from 'semantic-ui-react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import * as actions from '../redux/actions';
import noImage from '../noImage.png'

const ShowCard = (props) => {
    const { show, getShowDetails, clearSearchTerm, history } = props
    
    const onCardClick = () => {
        getShowDetails(show.id)
        clearSearchTerm()
        history.push(`/shows/${show.id}`)
    }
    
    const imageSrc = show.poster_path ? `https://image.tmdb.org/t/p/w200/${show.poster_path}` : noImage
    return (
        <div className='movie-card'>
        <Card onClick={onCardClick}>
            <Card.Content>
                <Card.Header>{show.name}</Card.Header>
            </Card.Content>
            <Image src={imageSrc} />
        </Card> 
        </div>
    )
}

export default withRouter(connect(null, actions)(ShowCard));