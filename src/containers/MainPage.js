import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../redux/actions';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import LoadingImage from './LoadingImage';

class MainPage extends PureComponent {
    componentDidMount() {
        this.props.getPopularShows();
    }

    componentWillUnmount() {
        this.props.resetShows();
    }

    onBannerClick = (e, { id }) => {
        this.props.history.push(`/shows/${id}`)
    }

    filteredShowsWithPoster = () => {
        return this.props.popularShows.filter(show => show.backdrop_path)
    }

    render() {
        return (
            this.props.popularShows ?

                <div className='carousel-container'>
                    <h2 className='main-page-header'>Popular Shows</h2>
                    <Carousel
                        infiniteLoop useKeyboardArrows autoPlay showArrows
                        className='main-carousel'
                    >
                        {this.filteredShowsWithPoster().map(showObj => (
                            <div
                                key={showObj.id}
                                onClick={(e) => this.onBannerClick(e, showObj)}
                            >
                                <img
                                    src={`https://image.tmdb.org/t/p/original/${showObj.backdrop_path}`}
                                    alt='hello'
                                />
                                <p className="legend">
                                    {showObj.name}
                                </p>
                            </div>
                        ))}
                    </Carousel>
                </div>
                :
                <LoadingImage />
        )
    }
}

const mapStateToProps = state => {
    return {
        popularShows: state.popularShows
    }
}

export default withRouter(connect(mapStateToProps, actions)(MainPage));

//react-responsive-carousel