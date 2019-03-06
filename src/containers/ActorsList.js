import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import ActorCard from './ActorCard';
import { Button } from 'semantic-ui-react';

class ActorsList extends PureComponent {
    state = {
        showAll: false
    }

    handleMoreActors = () => {
        this.setState({
            showAll: !this.state.showAll
        })
    }

    filterActors = () => {
        const { actorsList } = this.props
        if (this.state.showAll) {
            return actorsList;
        } else {
            return actorsList.slice(0, 5)
        }
    }

    render() {

        return (
            <div className='cast-container'>
                <h3 className='actors-list-header'>Top Paid Cast</h3>
                <div className='ui grid centered actors-list'>
                    {this.filterActors().map(actor => (
                        <ActorCard
                            key={actor.id}
                            actor={actor}
                        />
                    ))}

                </div>
                {this.props.actorsList.length > 0 && this.props.actorsList.length > 5 ? 
                <div className='show-all-actors'> 
                    <Button
                        content={this.state.showAll ? 'Show less' : 'Show all'}
                        onClick={this.handleMoreActors}
                    />
                </div>
                :
                null
                }
            </div>
        )
    }
}

const mapStateToPtops = state => {
    return {
        actorsList: state.showDetails.credits.cast
    }
}


export default connect(mapStateToPtops)(ActorsList);