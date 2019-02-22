import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import * as actions from '../redux/actions';
import { Redirect } from 'react-router';
import { Search } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';


class SearchBar extends PureComponent {
    state = {
        redirect: false
    }

    handleOnEnter = (e) => {
        if (e.key === 'Enter') {
            this.props.getShows()
            this.setState({ redirect: true })
        }
    }

    resetRedirectState = () => {
        this.setState({redirect: false})
    }

    render(){

        return(
            <div>
                <Search 
                    onSearchChange={(e) => {
                        this.props.setSearchTerm(e.target.value)
                    }}
                    onKeyPress={this.handleOnEnter}
                    showNoResults={false}
                    value={this.props.searchTerm}
                />
                {!this.state.redirect ? null : 
                 <Fragment>
                    <Redirect to={`/search?query=${this.props.searchTerm}`} />
                </Fragment>
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        searchTerm: state.searchTerm
    }
}


export default withRouter(connect(mapStateToProps, actions)(SearchBar))