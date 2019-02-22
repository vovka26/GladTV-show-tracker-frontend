import React, { PureComponent } from 'react';
import {Route, Switch} from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../redux/actions'

import SearchBar from '../components/SearchBar';
import ShowList from './ShowsList';

class App extends PureComponent {
  render() {
    return (
      <div className="App">
        <SearchBar />
        <Switch>
          <Route path='/search' component={ShowList} />
        </Switch>
      </div>
    );
  }
}



export default withRouter(connect(null, actions)(App));
