import React from 'react';
import { Image, Card } from 'semantic-ui-react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import * as actions from '../redux/actions';
import noImage from '../noImage.png'

const ShowCard = (props) => {

    const onShowCardClick = (props) => {
        props.getShowDetails(show.id)
        props.clearSearchTerm()
        props.history.push(`/shows/${show.id}`)
    }
    const { show } = props
    const imageSrc = show.poster_path ? `https://image.tmdb.org/t/p/w200/${show.poster_path}` : noImage
    return (
        <div className='movie-card'>
        <Card 
            onClick={() => onShowCardClick(props)}
        >
            <Card.Content>
                <Card.Header>{show.name}</Card.Header>
            </Card.Content>
            <Image src={imageSrc} />
        </Card> 
        </div>
    )
}

export default withRouter(connect(null, actions)(ShowCard));