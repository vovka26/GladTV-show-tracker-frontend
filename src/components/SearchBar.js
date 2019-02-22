import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import * as actions from '../redux/actions';
import { Search } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';


class SearchBar extends PureComponent {

    handleOnEnter = (e) => {
        if (e.key === 'Enter') {
            this.props.getShows()
            this.props.history.push(`/search?query=${this.props.searchTerm}`)
        }
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