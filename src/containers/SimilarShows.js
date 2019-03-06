import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../redux/actions';
import LoadingImage from './LoadingImage';
import ShowCard from './ShowCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import uuidv5 from 'uuid';

class SimilarShows extends PureComponent {
    componentDidMount() {
        this.getShows()
    }

    componentWillUnmount() {
        this.props.resetShows()
    }

    getShows = () => {
        const showId = this.showId()
        const pageNum = this.pageNum()
        this.props.getSimilarShows(showId, pageNum)
    }

    pageNum = () => {
        const pageNum = this.props.location.search
        return pageNum.includes('?page=') ? parseInt(pageNum.split('?page=')[1]) : 1
    }

    showId = () => {
        return this.props.match.params.id
    }

    totalPagesNum = () => {
        return this.props.similarShows.total_pages
    }

    fetchMoreData = () => {
        let id = this.showId()
        let page = this.pageNum() + 1
        this.props.getMoreSimilarShows(id, page)
        this.props.history.push(`/shows/similar/${this.showId()}?page=${page}`)
    }

    render() {
        const { similarShows } = this.props
        return (
            similarShows ?
                <InfiniteScroll
                    dataLength={similarShows.length}
                    next={this.fetchMoreData}
                    hasMore={true}
                    loader={'...'}
                >
                        {similarShows.map(show =>
                            <ShowCard
                                show={show}
                                key={uuidv5()}
                            />
                        )}
                </InfiniteScroll>
                :
                <LoadingImage />
        )
    }
}

const mapStateToProps = state => {
    return {
        similarShows: state.similarShows
    }
}

export default withRouter(connect(mapStateToProps, actions)(SimilarShows));