import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import WatchListCard from '../containers/WatchListCard';
import * as actions from '../redux/actions'
import { Dimmer, Loader } from 'semantic-ui-react';

class WatchList extends Component {
    componentWillMount() {
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
                                key={show.api_id}
                            />
                        ))}
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
        currentUser: state.currentUser,
        watchList: state.watchList
    }
}

export default connect(mapStateToProps, actions)(WatchList);