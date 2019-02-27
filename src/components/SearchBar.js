import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import * as actions from '../redux/actions';
import { Input } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';


class SearchBar extends PureComponent {
    handleOnEnter = (e) => {
        if (e.key === 'Enter') {
            if (this.props.seasonDetails) {
                this.props.clearSeasonDetails()
            }
            this.props.getShows()
            this.props.history.push(`/search?query=${this.props.searchTerm}`)
        }
    }

    render(){

        return(
            <div>
                <Input 
                    fluid icon='search'
                    onChange={(e) => {
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
        searchTerm: state.searchTerm,
        seasonDetails: state.seasonDetails
    }
}


export default withRouter(connect(mapStateToProps, actions)(SearchBar))