import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
import * as actions from '../redux/actions'
import ShowCard from './ShowCard';
import { Dimmer, Loader } from 'semantic-ui-react';

class ShowList extends PureComponent {
    componentWillMount() {
        const { location, setSearchTerm, searchTerm, getShows } = this.props
        const query = location.search.split('?query=')[1]
        if (!searchTerm && query) {
            setSearchTerm(query)
            getShows()
        }
    }

    componentWillUnmount(){
        this.props.resetShows()
        this.props.clearSearchTerm()
    }

    render() {
        const { shows } = this.props
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
}

const mapStateToProps = state => {
    return {
        shows: state.shows,
        searchTerm: state.searchTerm
    }
}

export default withRouter(connect(mapStateToProps, actions)(ShowList));