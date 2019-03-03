import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Image, Button, Grid } from 'semantic-ui-react';
import * as actions from '../redux/actions'
import EpisodesTable from '../containers/EpisodesTable';
import ActorsList from '../containers/ActorsList';
import { Dimmer, Loader } from 'semantic-ui-react';

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

    state = {
        seasonId: null
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
        return watchList.some(show => show.api_id === currentShow.id)
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
                                        src={`https://image.tmdb.org/t/p/w500/${currentShow.poster_path}`}
                                        size='large'
                                    />
                                </Grid.Column>
                                <Grid.Column width={10}>
                                    <Grid.Row>
                                        <h3>Overview</h3>
                                        {currentShow.overview}
                                    </Grid.Row>
                                    <Grid.Row>
                                        <div>
                                            {localStorage.token ?
                                                <Button
                                                    onClick={this.onWatchShowClick}
                                                    content={this.isSubscribed() ? 'Unubscribe!' : 'Subscribe'}
                                                />
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
            currentShow: state.showDetails,
            watchList: state.watchList
        }
    }

    export default withRouter(connect(mapStateToProps, actions)(ShowDetails));

