import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { Image, Button, Grid, Progress } from 'semantic-ui-react';
import * as actions from '../redux/actions'
import EpisodesTable from '../containers/EpisodesTable';
import ActorsList from '../containers/ActorsList';
import LoadingImage from '../containers/LoadingImage';
import noImage from '../noImage.png';
import TrailerModal from '../containers/TrailerModal';


class ShowDetails extends PureComponent {

    componentDidMount() {

        this.props.clearSearchTerm()
        const showId = this.props.match.params.id
        this.props.getShowDetails(showId)

        if (localStorage.token) {
            this.props.gettingEpisodesForSeason(showId)
        }
    }

    componentWillUnmount() {
        this.props.resetShowPage()
    }

    onSeasonClick = ({ target }) => {
        this.props.getSeasonDetails(this.props.currentShow.id, target.id)
    }

    onWatchShowClick = () => {
        const { addShowToUserWatchlist, deleteShowFromWatchlist, currentShow } = this.props
        if (this.isSubscribed()) {
            deleteShowFromWatchlist(this.currentShowId())
        } else {
            addShowToUserWatchlist(currentShow)
        }
    }

    isSubscribed = () => {
        if (this.props.watchList) {
            return this.props.watchList.find(show => show.api_id === this.props.currentShow.id) ? true : false
        }
    }

    currentShowId = () => {
        const { watchList, currentShow } = this.props
        return watchList.find(show => show.api_id === currentShow.id).id
    }

    seasonsForCurrentShow = () => {
        return (this.props.currentShow.seasons.map(season => (
            <Button
                className='season-button'
                circular
                key={season.id}
                id={season.season_number}
                onClick={this.onSeasonClick}
                content={season.season_number === 0 ?
                    'Specials' : season.season_number}
            />
        )))
    }

    imgSrc = () => {
        const { currentShow } = this.props
        return currentShow.poster_path ? `https://image.tmdb.org/t/p/original/${currentShow.poster_path}` : noImage
    }

    backgroundImg = () => {
        const { currentShow } = this.props
        return currentShow.backdrop_path ? `https://image.tmdb.org/t/p/original/${currentShow.backdrop_path}` : null
    }

    render() {
        const { currentShow, episodes } = this.props

        return (
            this.props.currentShow ?
                <div className='show-main-container'>
                    <div className='show-details-background-picture'
                        style={{
                            background: `url(${this.backgroundImg()})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center center',
                            backgroundRepeat: 'no-repeat'
                        }}
                    >

                        <div className='show-details-background-color'>
                            <div className='show-details-container'>
                                <Grid columns={2} width={16} className='show-overview-block'>
                                    <Grid.Row className='show-title'>
                                        <h2>{currentShow.name}</h2>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Grid.Column width={6} >
                                            <Image
                                                src={this.imgSrc()}
                                                size='large'
                                            />
                                        </Grid.Column>
                                        <Grid.Column width={10}>
                                            <Grid.Row>
                                                <h3>Overview</h3>
                                                <div>{currentShow.overview}</div>

                                                {/* {currentShow.next_episode_to_air && currentShow.last_episode_to_air ?
                                                    <h4>
                                                        Next episode: {
                                                            currentShow.next_episode_to_air.air_date
                                                        }</h4> :
                                                    <h4>
                                                        Last episode: {
                                                            currentShow.last_episode_to_air.air_date
                                                        }
                                                    </h4>
                                                } */}
                                            </Grid.Row>
                                            <Grid.Row>
                                                <div className='buttons-row'>
                                                    {localStorage.token ?
                                                            <Button
                                                                onClick={this.onWatchShowClick}
                                                                content={this.isSubscribed() ? 'Unubscribe!' : 'Subscribe'}
                                                                inverted color={this.isSubscribed() ? 'red' : 'green'}
                                                            />
                                                        :
                                                        null
                                                    }
                                                    <Link to={`/shows/similar/${currentShow.id}`}>
                                                        <Button inverted color='yellow'>Similar Shows</Button>
                                                    </Link>
                                                    <TrailerModal />
                                                </div>
                                            </Grid.Row>
                                           
                                            <Grid.Row className='cast-container'> 
                                                <ActorsList />
                                            </Grid.Row>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </div>
                        </div>
                    </div>
                    {localStorage.token ?
                    <Progress
                        className='progress-bar'
                        label={`${episodes.length}/${currentShow.number_of_episodes ? currentShow.number_of_episodes : 0}`}
                        // progress='ratio'
                        color='green'
                        value={episodes ? episodes.length : 0}
                        total={currentShow.number_of_episodes}
                    /> 
                    : 
                    null
                    }
                    <div className='seasons-episodes-container'>
                        <div className='seasons-buttons-container'>
                            {this.seasonsForCurrentShow()}
                        </div>
                        <EpisodesTable />
                    </div>
                </div>
                :
                <LoadingImage />
        )
    }
}

const mapStateToProps = state => {
    return {
        currentShow: state.showDetails,
        watchList: state.watchList,
        episodes: state.episodes
    }
}

export default withRouter(connect(mapStateToProps, actions)(ShowDetails));

