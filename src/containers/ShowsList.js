import React from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import { Route } from 'react-router-dom';
import ShowCard from '../components/ShowCard';

const ShowList = (props) => {
    const {shows} = props.shows
    if (shows) {
        return(
            <div>
               <Route path='/search' render={() => (
                  shows.map(show =>  
                    <ShowCard 
                    key={show.id}
                    show={show}
                     />)
                )}/>
            </div>
        )
    }else{
        return null
    }
    
}

const mapStateToProps = state => {
    return {
        shows: state.shows
    }
}

export default withRouter(connect(mapStateToProps)(ShowList));