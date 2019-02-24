import React, { PureComponent } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class WatchList extends PureComponent {
    render(){
        const { currentUser } = this.props
        return(
            !localStorage.getItem('token') ? <Redirect to='/login' /> :
            <div>
                {currentUser ? `Hello ${currentUser.username}` : null}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        currentUser: state.currentUser
    }
}

export default connect(mapStateToProps)(WatchList);