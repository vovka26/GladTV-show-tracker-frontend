import React from 'react';
import { Table, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import * as actions from '../redux/actions'


const EpisodesTable = (props) => {
    const { seasonDetails } = props

    const onClick = (episode, props) => {
        if(isWatched(props, episode)){
            props.deleteingEpisodeFromWatchList(episode.id)
        }else{
            props.addingEpisodeToWatchlist(episode, props.seasonDetails.id)
        }
    }

    const isWatched = (props, episode) => {
        // debugger
        return props.episodes.find(ep => ep.api_id === episode.id) ? true : false
    }

    return(
        <div>
            {!seasonDetails ? null : 
                <Table>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Episode</Table.HeaderCell>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Air date</Table.HeaderCell>
                            {localStorage.token? 
                            <Table.HeaderCell>Watched</Table.HeaderCell>
                            : null }
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        { seasonDetails.episodes.map(episode => (
                            <Table.Row key={episode.id}>
                                <Table.Cell>{episode.episode_number}</Table.Cell>
                                <Table.Cell>{episode.name}</Table.Cell>
                                <Table.Cell>{episode.air_date}</Table.Cell>
                                {localStorage.token? 
                                    <Table.Cell><Icon color={isWatched(props, episode) ? 'green' : 'grey'} onClick={() => onClick(episode, props)} name='eye' /></Table.Cell>
                                    : 
                                    null
                                }
                                
                            </Table.Row>
                        ))}
                        
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