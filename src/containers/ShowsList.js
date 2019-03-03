import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
import ShowCard from './ShowCard';
import { Dimmer, Loader } from 'semantic-ui-react';

const ShowList = (props) => {
    const { shows } = props
    return (
        shows ?
            <div className='ui grid centered'>
                <Route path='/search' render={() => (
                    shows.map(show =>
                        <ShowCard
                            key={show.id}
                            show={show}
                        />)
                )} />
            </div>
            :
            <Dimmer active inverted>
                <Loader
                    size='large'
                    inverted
                    content='Loading'
                />
            </Dimmer>
    )

}

const mapStateToProps = state => {
    return {
        shows: state.shows
    }
}

export default withRouter(connect(mapStateToProps)(ShowList));