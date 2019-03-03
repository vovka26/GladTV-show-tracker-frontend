import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Image, Button, Grid } from 'semantic-ui-react';
import * as actions from '../redux/actions'
import EpisodesTable from '../containers/EpisodesTable';
import ActorsList from '../containers/ActorsList';
import LoadingImage from '../containers/LoadingImage';
import noImage from '../noImage.png';


class ShowDetails extends PureComponent {

    componentWillMount() {

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
        const { currentShow, watchList } = this.props
        return watchList.find(show => show.api_id === currentShow.id) ? true : false
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

    render() {
        const { currentShow } = this.props
        const imgSrc = currentShow.poster_path ? `https://image.tmdb.org/t/p/original/${currentShow.poster_path}` : noImage
        return (
            currentShow ?
                <div className='show-details-container'>

                    <Grid columns={2} width={16} className='show-overview-block'>
                        <Grid.Row className='show-title'>
                            <h2>{currentShow.name}</h2>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={6} >

                                <Image
                                    src={imgSrc}
                                    size='large'
                                />
                            </Grid.Column>
                            <Grid.Column width={10}>
                                <Grid.Row>
                                    <h3>Overview</h3>
                                    {currentShow.overview}
                                    {currentShow.next_episode_to_air ?
                                        <h4>
                                            Next episode: {
                                                currentShow.next_episode_to_air.air_date
                                            }</h4> :
                                        <h4>
                                            Last episode: {
                                                currentShow.last_episode_to_air.air_date
                                            }
                                        </h4>
                                    }
                                </Grid.Row>
                                <Grid.Row>
                                    <div>
                                        {localStorage.token ?
                                            <Button
                                                onClick={this.onWatchShowClick}
                                            >
                                                {this.isSubscribed() ? 'Unubscribe!' : 'Subscribe'}
                                            </Button>
                                            :
                                            null
                                        }
                                    </div>
                                </Grid.Row>
                                <Grid.Row>
                                    <ActorsList />
                                </Grid.Row>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>

                    <div className='seasons-buttons-container'>
                        {this.seasonsForCurrentShow()}

                    </div>
                    <EpisodesTable />
                </div>
                :
                <LoadingImage />
        )
    }
}

const mapStateToProps = state => {
    return {
        currentShow: state.showDetails,
        watchList: state.watchList
    }
}

export default withRouter(connect(mapStateToProps, actions)(ShowDetails));

