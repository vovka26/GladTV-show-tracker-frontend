import React, { PureComponent } from 'react';
import { Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../redux/actions';

import SearchBar from '../components/SearchBar';
import ShowList from './ShowsList';
import ShowDetails from '../components/ShowDetails';
import Login from '../components/Login';
import SignUp from '../components/SignUp';
import WatchList from '../components/WatchList';
import Navbar from './Navbar';
import ActorDetails from '../components/ActorDetails';
import MainPage from './MainPage';
import SimilarShows from './SimilarShows';
import NotFoundPage from './NotFoundPage';

class App extends PureComponent {
  componentDidMount() {
    let token = localStorage.getItem('token')
    if (token) {
      this.props.checkToken(token)
      this.props.getWatchList()
    }
  }

  render() {
    return (
        <div className="App">
          <Navbar />
          <SearchBar />
          <Switch>
            <Route path='/' exact component={MainPage} />
            <Route path='/home' exact component={MainPage} />
            <Route path='/login' component={Login} />
            <Route path='/signup' component={SignUp} />
            <Route path='/watchlist' component={WatchList} />
            <Route path='/search' component={ShowList} />
            <Route path='/shows/similar/:id' component={SimilarShows} />
            <Route path='/shows/:id' component={ShowDetails} />
            <Route path='/actors/:id' component={ActorDetails} />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  }
}

export default withRouter(connect(mapStateToProps, actions)(App));
