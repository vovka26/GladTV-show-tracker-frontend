import React from 'react';
import { Card, Image, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import * as actions from '../redux/actions'

const WatchListCard = props => {
    const { show, deleteShowFromWatchlist } = props

    const deleteButton = () => {
        deleteShowFromWatchlist(show.id)
    }

    return(
        show ? 
        <Card 
            // onClick={() => onShowCardClick(props)}
        >
            <Card.Content>
                <Card.Header>
                    {show.title}
                    <Button 
                        circular
                        onClick={deleteButton}
                    >
                         x 
                    </Button>
                </Card.Header>
            </Card.Content>
            <Image src={`https://image.tmdb.org/t/p/w200/${show.image_url}`} />
        </Card> 
        :
        null
    )
}

export default connect(null, actions)(WatchListCard);