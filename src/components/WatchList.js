import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import WatchListCard from '../containers/WatchListCard';
import * as actions from '../redux/actions'
// import ShowCard from './ShowCard';

class WatchList extends Component {
    componentWillMount(){
        this.props.getWatchList()
    }

    render(){
        const { watchList } = this.props
        return(
            !localStorage.getItem('token') ? <Redirect to='/login' /> :
            <div>
                {watchList.map(show => (
                    <WatchListCard
                        show={show}
                        key={show.api_id}
                    />
                ))}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        currentUser: state.currentUser,
        watchList: state.watchList
    }
}

export default connect(mapStateToProps, actions)(WatchList);