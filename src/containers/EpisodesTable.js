import React from 'react';
import { Table, Icon, Image } from 'semantic-ui-react';
import { connect } from 'react-redux';
import * as actions from '../redux/actions';
import Popup from 'reactjs-popup';

const EpisodesTable = (props) => {
    const { seasonDetails, addShowToUserWatchlist, currentShow, addingEpisodeToWatchlist, deleteingEpisodeFromWatchList } = props

    const onClick = (episode, props) => {
        if (isWatched(props, episode)) {
            deleteingEpisodeFromWatchList(episode.id)
        } else {

            if (!isSubscribedForShow(props, episode.show_id)) {
                addShowToUserWatchlist(currentShow)
            }
            addingEpisodeToWatchlist(episode, seasonDetails.id)
        }
    }

    const isWatched = (props, episode) => {
        return props.episodes.find(ep => ep.api_id === episode.id) ? true : false
    }

    const isSubscribedForShow = (props, showId) => {
        return props.watchList.find(show => show.api_id === showId) ? true : false
    }

    const tableEpisodes = () => {
        return seasonDetails.episodes.map(episode => (
            <Popup
                key={episode.id}
                trigger={
                    <Table.Row
                        className='episodes-table-row'
                    >
                        <Table.Cell
                            content={episode.episode_number}
                        />
                        <Table.Cell
                            className='episodes-table-cell-name'
                            content={episode.name}
                        />
                        <Table.Cell
                            content={episode.air_date}
                        />
                        {localStorage.token ?
                            <Table.Cell
                                content={
                                    <Icon
                                        color={isWatched(props, episode) ? 'green' : 'grey'}
                                        onClick={() => onClick(episode, props)} name='eye'
                                    />
                                }
                            />
                            :
                            null
                        }
                    </Table.Row>
                }
                position="top center"
                on="hover"
            >
                {episode.overview ? episode.overview : episode.name}
                <Image src={episode.still_path ? `https://image.tmdb.org/t/p/original/${episode.still_path}` : null} />
            </Popup>
        ))
    }

    return (
        <div className='episodes-table'>
            {!seasonDetails ? null :
                <Table
                    className='ui centered'
                    selectable
                >
                    <Table.Header>
                        <Table.Row className='episodes-table-row'>

                            <Table.HeaderCell
                                className='episodes-table-cell'
                                content='Episode'
                            />

                            <Table.HeaderCell
                                className='episodes-table-cell'
                                content='Name'
                            />

                            <Table.HeaderCell
                                className='episodes-table-cell'
                                content='Air date'
                            />

                            {localStorage.token ?
                                <Table.HeaderCell
                                    className='episodes-table-cell'
                                    content='Watched'
                                />
                                : null}
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {tableEpisodes()}
                    </Table.Body>
                </Table>
            }
        </div>
    )
}

const mapStateToProps = state => {
    return {
        currentShow: state.showDetails,
        seasonDetails: state.seasonDetails,
        watchList: state.watchList,
        episodes: state.episodes
    }
}

export default connect(mapStateToProps, actions)(EpisodesTable);