import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../redux/actions'
import ShowCard from './ShowCard';
import LoadingImage from './LoadingImage';
import { Loader } from 'semantic-ui-react';
import InfiniteScroll from 'react-infinite-scroll-component';
import uuidv5 from 'uuid';


class ShowList extends PureComponent {
    state = {
        page: 2
    }
    componentDidMount() {
        const { location, setSearchTerm, searchTerm, getShows } = this.props
        const query = location.search.split('?query=')[1]
        if (!searchTerm && query) {
            setSearchTerm(query)
            getShows()
        }
    }

    componentWillUnmount() {
        this.props.clearSearchTerm()
        this.props.resetShows()
    }

    fetchMoreData = () => {
        this.props.getMoreShows(this.state.page)
        this.setState({
            page: this.state.page + 1
        })
    }

    render() {
        const { shows } = this.props
        return (
            shows ?
                <InfiniteScroll
                    dataLength={shows.length}
                    next={this.fetchMoreData}
                    hasMore={true}
                    loader={<Loader
                        size='large'
                        inverted
                        content='Loading'
                    />}
                >
                    <div className='cards-container'>
                        {shows.map(show =>
                            <ShowCard
                                key={uuidv5()}
                                show={show}
                            />
                        )}
                    </div>
                </InfiniteScroll>
                :
                <LoadingImage />
        )
    }
}

const mapStateToProps = state => {
    return {
        shows: state.shows,
        searchTerm: state.searchTerm
    }
}

export default withRouter(connect(mapStateToProps, actions)(ShowList));