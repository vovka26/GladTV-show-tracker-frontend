import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Loader, Dimmer } from 'semantic-ui-react';
import * as actions from '../redux/actions';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

class MainPage extends PureComponent {
    componentDidMount() {
        this.props.getPopularShows();
    }

    componentWillUnmount() {
        this.props.resetShows();
    }

    onBannerClick = (e, {id}) => {
        this.props.history.push(`/shows/${id}`)
    }

    render() {
        return (
            this.props.shows ? 
            <Fragment>
                <Carousel
                    infiniteLoop useKeyboardArrows autoPlay showArrows
                    className='main-carousel'
                >
                    {this.props.shows.map(show => 
                        (
                            <div 
                                key={show.id}
                                onClick={(e) => this.onBannerClick(e, show)}
                            >
                                <img
                                    src={`https://image.tmdb.org/t/p/original${show.backdrop_path}`}
                                    alt='hello'
                                />
                                <p className="legend">
                                    {show.name}
                                </p>
                            </div>
                        )
                    )}

                </Carousel>
            </Fragment>
            :
            <Dimmer active inverted>
                <Loader
                    size='large'
                    inverted
                    content='Loading'
                />
            </Dimmer>
        )
    }
}

const mapStateToProps = state => {
    return {
        shows: state.shows
    }
}

export default withRouter(connect(mapStateToProps, actions)(MainPage));

//react-responsive-carousel