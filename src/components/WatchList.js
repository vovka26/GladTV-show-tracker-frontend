import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import WatchListCard from '../containers/WatchListCard';
import * as actions from '../redux/actions';
import LoadingImage from '../containers/LoadingImage';

class WatchList extends Component {
    componentDidMount() {
        if (!this.props.watchList) {
            this.props.getWatchList()
        }
    }
    render() {
        const { watchList } = this.props
        return (
            !localStorage.getItem('token') ? <Redirect to='/login' /> :
                watchList ?
                    <div className='ui grid centered'>
                        {watchList.map(show => (
                            <WatchListCard
                                show={show}
                                key={show.id}
                            />
                        ))}
                    </div>
                    :
                    <LoadingImage />
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