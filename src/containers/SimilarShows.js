import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import * as actions from '../redux/actions';
import LoadingImage from './LoadingImage';
import ShowCard from './ShowCard';

class SimilarShows extends PureComponent {
    componentDidMount(){
        const { match, location } = this.props
        const showId = match.params.id
        const pageNum = location.search.includes('?page=') ? location.search.split('?page=')[1] : 1
        this.props.getSimilarShows(showId, pageNum)
    }

    componentWillUnmount(){
        this.props.resetShows()
    }

    render(){
        const { similarShows } = this.props
        
        return(
            similarShows.results ? 
            similarShows.results.map(show => 
                <ShowCard 
                    show={show}
                    key={show.id}
                />
            )
            :
            <LoadingImage />
        )
    }
}

const mapStateToProps = state => {
    return {
        similarShows: state.similarShows
    }
}

export default withRouter(connect(mapStateToProps, actions)(SimilarShows));