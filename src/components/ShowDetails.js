import React, { PureComponent } from 'react'; 
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import { Image, Button } from 'semantic-ui-react';
import * as actions from '../redux/actions'
import EpisodesTable from '../containers/EpisodesTable';

class ShowDetails extends PureComponent {
    componentWillMount(){
        const showId = this.props.match.params.id
        this.props.getShowDetails(showId)
        // if (localStorage.token) {
            this.props.gettingEpisodesForSeason(showId)
        // }
    }

    state = {
        seasonId: null
    }
    
    onSeasonClick = ({target}) => {
        
        // const hey = this
        
        this.props.getSeasonDetails(this.props.currentShow.id, target.id)
        // debugger
        // this.props.gettingEpisodesForSeason(this.props.match.params.id, this.props.seasonDetails.id)
    }

    onWatchShowClick = () => {
        const {addShowToUserWatchlist, deleteShowFromWatchlist, currentShow} = this.props
        if (this.isSubscribed()) {
            deleteShowFromWatchlist(this.currentShowId())
        }else{
            addShowToUserWatchlist(currentShow)
        }
        
    }

    isSubscribed = () => {
        const {currentShow, watchList} = this.props
        return watchList.some(show => show.api_id === currentShow.id)
    }

    currentShowId = () => {
        const { watchList, currentShow } = this.props
        return watchList.find(show => show.api_id === currentShow.id).id
    }

    render(){
        const { currentShow } = this.props
        if (currentShow){
            return(
                <div>
                    <h3>{currentShow.name}</h3>
                    {localStorage.token ? 
                        <Button
                            onClick={this.onWatchShowClick}    
                        >{this.isSubscribed() ? 'Unubscribe!' : 'Subscribe' }
                        </Button> 
                        : 
                        null
                    }
                    <div>
                        <Image 
                            src={`https://image.tmdb.org/t/p/w500/${currentShow.poster_path}`}
                            size='medium'
                        />
                        <div>{currentShow.overview}</div>
                    </div>

                    <div>
                        {currentShow.seasons.map(season => (
                            <Button 
                                circular 
                                key={season.id}
                                id={season.season_number}
                                onClick={this.onSeasonClick}
                            > {season.season_number}
                            </Button>
                        ))}
                    </div>
                        <EpisodesTable />
                </div>
            )
        }else{
            return null
        }
    }
}

const mapStateToProps = state => {
    return {
        currentShow: state.showDetails,
        watchList: state.watchList
    }
}

export default withRouter(connect(mapStateToProps, actions)(ShowDetails));

