import React, { PureComponent } from 'react'; 
import { connect } from 'react-redux';
import { Image, Button } from 'semantic-ui-react';
import * as actions from '../redux/actions'
import EpisodesTable from '../containers/EpisodesTable';

class ShowDetails extends PureComponent {
    state = {
        seasonId: null
    }
    
    onSeasonClick = ({target}) => {
        this.props.getSeasonDetails(this.props.show.id, target.id)
    }

    onWatchShowClick = () => {
        this.props.addShowToUserWatchlist(this.props.show)
    }

    render(){
        const { show } = this.props
        if (show){
            return(
                <div>
                    <h3>{show.name}</h3>
                    <Button
                        onClick={this.onWatchShowClick}    
                    >Subscribe!
                    </Button>
                    <div>
                        <Image 
                            src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`}
                        />
                    </div>

                    <div>
                        {show.seasons.map(season => (
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
        show: state.showDetails
    }
}

export default connect(mapStateToProps, actions)(ShowDetails);

