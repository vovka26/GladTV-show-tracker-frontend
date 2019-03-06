import React, { Fragment } from 'react';
import { Image, Card, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../redux/actions';
import noImage from '../noImage.png'
import ShowSubscribeButton from './ShowSubscribeButton';
import LoadingImage from './LoadingImage';

const ShowCard = (props) => {
    const { show, history } = props

    const onCardClick = () => {
        history.push(`/shows/${show.id}`)
    }

    const findShowIdInWatchlist = (watchList, show) => {
        return watchList.find(showObj => showObj.api_id === show.id).id
    }

    const addShow = (e, props) => {
        e.stopPropagation()
        props.addShowToUserWatchlist(props.show)
    }

    const deleteShow = (e, props) => {
        e.stopPropagation()
        const id = props.findShowIdInWatchlist(props.watchList, props.show)
        props.deleteShowFromWatchlist(id)
    }

    const isSubscribed = (props) => {
        const { show, watchList } = props
        return watchList.find(showObj => showObj.api_id === show.id) ? true : false
    }

    const imageSrc = show.poster_path ? `https://image.tmdb.org/t/p/original/${show.poster_path}` : noImage

    return (

        <div className='movie-card'>
            <Card onClick={onCardClick}>
                {localStorage.token ?
                    <Fragment>
                        {props.watchList ?
                            <Card.Content className='movie-card-header'>
                                {isSubscribed(props) ?
                                    <ShowSubscribeButton
                                        show={show}
                                        className='card-button-delete-show'
                                        onButtonClick={deleteShow}
                                        buttonContent={'Delete from Watchlist'}
                                        findShowIdInWatchlist={findShowIdInWatchlist}
                                        watchList={props.watchList}
                                        deleteShowFromWatchlist={props.deleteShowFromWatchlist}
                                        addShowToUserWatchlist={props.addShowToUserWatchlist}
                                    />
                                    :
                                    <ShowSubscribeButton
                                        show={show}
                                        className='card-button-add-show'
                                        onButtonClick={addShow}
                                        buttonContent={'Add to Watchlist'}
                                        findShowIdInWatchlist={findShowIdInWatchlist}
                                        watchList={props.watchList}
                                        deleteShowFromWatchlist={props.deleteShowFromWatchlist}
                                        addShowToUserWatchlist={props.addShowToUserWatchlist}
                                    />

                                }
                            </Card.Content>

                            :
                            <LoadingImage />
                        }
                    </Fragment>

                    :
                    <Card.Content className='movie-card-header'>
                        <Button
                            content={show.name}
                            className='movie-card-button-header'
                        />
                    </Card.Content>
                }
                <Image
                    className='card-image'
                    src={imageSrc}
                    size='medium'
                />
            </Card>
        </div>

    )
}

const mapStateToProps = state => {
    return {
        watchList: state.watchList
    }
}

export default withRouter(connect(mapStateToProps, actions)(ShowCard));