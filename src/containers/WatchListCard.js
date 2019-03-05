import React from 'react';
import { Card, Image, Button } from 'semantic-ui-react';
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../redux/actions'

const WatchListCard = props => {
    
    const { show, deleteShowFromWatchlist, getShowDetails, clearSearchTerm, history } = props
    const onCardClick = () => {
        getShowDetails(show.api_id)
        clearSearchTerm()
        history.push(`/shows/${show.api_id}`)
    }

    const deleteButton = (e) => {
        e.stopPropagation()
        deleteShowFromWatchlist(show.id)
    }

    return(
        show ? 
        <div className='movie-card'>
            <Card onClick={onCardClick}>
                <Card.Content className='movie-card-header'>
                        <Button 
                            className='card-button-delete-show'
                            animated='fade'
                            onClick={deleteButton}
                        >
                            <Button.Content visible>{show.title}</Button.Content>
                            <Button.Content hidden>Delete From Watchlist</Button.Content>
                        </Button>
                </Card.Content>
                <Image 
                    className='card-image'
                    src={`https://image.tmdb.org/t/p/original/${show.image_url}`} 
                    size='medium'
                />
            </Card> 
        </div>
        :
        null
    )
}

export default withRouter(connect(null, actions)(WatchListCard));