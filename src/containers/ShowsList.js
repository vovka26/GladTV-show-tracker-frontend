import React from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import ShowCard from '../components/ShowCard'
// import ShowDetails from './ShowDetails';

const ShowList = (props) => {
    const {shows} = props.shows
    return(
        <div>
            {!shows ? null : shows.map(show => 
                <ShowCard 
                    key={show.id}
                    show={show}
                />)}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        shows: state.shows
    }
}

export default withRouter(connect(mapStateToProps)(ShowList));