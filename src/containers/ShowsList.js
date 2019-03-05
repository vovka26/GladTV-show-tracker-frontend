import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../redux/actions'
import ShowCard from './ShowCard';
import LoadingImage from './LoadingImage';

class ShowList extends PureComponent {
    componentWillMount() {
        const { location, setSearchTerm, searchTerm, getShows } = this.props
        const query = location.search.split('?query=')[1]
        if (!searchTerm && query) {
            setSearchTerm(query)
            getShows()
        }
    }

    componentWillUnmount() {
        this.props.clearSearchTerm()
        this.props.resetShows()
    }

    render() {
        const { shows } = this.props
        return (
            shows ?
                <div className='ui grid centered'>
                    {shows.map(show =>
                        <ShowCard
                            key={show.id}    
                            show={show}
                        />
                    )}
                </div>
                :
               <LoadingImage />
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