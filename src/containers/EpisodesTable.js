import React from 'react';
import { Table } from 'semantic-ui-react';
import { connect } from 'react-redux';


const EpisodesTable = (props) => {
    const { seasonDetails } = props
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
        seasonDetails: state.seasonDetails
    }
}

export default connect(mapStateToProps)(EpisodesTable)