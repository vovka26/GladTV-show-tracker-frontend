import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import * as actions from '../redux/actions';
import { Input, Sticky } from 'semantic-ui-react';
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

    render() {
        return (
            <Sticky>
                <Input
                    className='searchbar'
                    placeholder='Search for show...'
                    fluid icon='search'
                    onChange={(e) => {
                        this.props.setSearchTerm(e.target.value)
                    }}
                    onKeyPress={this.handleOnEnter}
                    value={this.props.searchTerm}
                />
            </Sticky>
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