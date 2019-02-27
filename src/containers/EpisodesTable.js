import React from 'react';
import { Table, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import * as actions from '../redux/actions'


const EpisodesTable = (props) => {
    const { seasonDetails } = props
    const onClick = (episode, props) => {
        debugger
        // props.delete_from_users_watchlist()
        // props.addingEpisodeToWatchlist(episode)
    }
    return(
        <div>
            {!seasonDetails ? null : 
                <Table>
                    <Table.Body>
                        { seasonDetails.episodes.map(episode => (
                            <Table.Row key={episode.id}>
                                <Table.Cell>{episode.episode_number}</Table.Cell>
                                <Table.Cell>{episode.name}</Table.Cell>
                                <Table.Cell>{episode.air_date}</Table.Cell>
                                <Table.Cell><Icon color={true ? 'green' : 'grey'} onClick={() => onClick(episode, props)} name='eye' /></Table.Cell>
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
        watchList: state.watchList
    }
}

export default connect(mapStateToProps, actions)(EpisodesTable)