import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import * as actions from '../redux/actions';
import LoadingImage from './LoadingImage';

class SimilarShows extends PureComponent {
    componentDidMount(){
        const { match, location } = this.props
        const showId = match.params.id
        const pageNum = location.search.includes('?page=') ? location.search.split('?page=')[1] : 1
        this.props.getSimilarShows(showId, pageNum)
    }

    render(){
        return(
            this.props.similarShows ? 
            <div>
                
            </div>
            :
            <LoadingImage />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        similarShows: state.shows
    }
}

export default withRouter(connect(mapStateToProps, actions)(SimilarShows));