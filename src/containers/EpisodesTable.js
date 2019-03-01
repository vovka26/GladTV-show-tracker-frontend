import React from 'react';
import { Table, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import * as actions from '../redux/actions'


const EpisodesTable = (props) => {
    const { seasonDetails } = props

    const onClick = (episode, props) => {
        if (isWatched(props, episode)) {
            props.deleteingEpisodeFromWatchList(episode.id)
        } else {
            props.addingEpisodeToWatchlist(episode, props.seasonDetails.id)
        }
    }

    const isWatched = (props, episode) => {
        return props.episodes.find(ep => ep.api_id === episode.id) ? true : false
    }

    const tableEpisodes = () => {
        return seasonDetails.episodes.map(episode => (
            <Table.Row 
                key={episode.id} 
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
        seasonDetails: state.seasonDetails,
        watchList: state.watchList,
        episodes: state.episodes
    }
}

export default connect(mapStateToProps, actions)(EpisodesTable)