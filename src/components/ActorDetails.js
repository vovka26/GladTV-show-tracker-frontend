import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Image, Grid, Divider } from 'semantic-ui-react';
import * as actions from '../redux/actions';
import noActorImg from '../noImageActor.png';
import ShowCard from '../containers/ShowCard';
import LoadingImage from '../containers/LoadingImage'
import uuidv5 from 'uuid';

class ActorDetails extends PureComponent {

    componentDidMount() {
        const actorId = this.props.match.params.id
        this.props.gettingActorDetails(actorId)
    }

    componentWillUnmount() {
        this.props.clearActorDetails()
    }

    render() {

        const { actor } = this.props
        const imgSrc = actor.profile_path ? `https://image.tmdb.org/t/p/original/${actor.profile_path}` : noActorImg

        return (
            actor ?
                <div className='actor-details-container' >
                    <Grid columns={2} width={16} >

                        <Grid.Row>
                            <Grid.Column width={10}>
                                <div>
                                    <Grid.Row>
                                        <div className='biography-row-title'>
                                            <h3>Biography</h3>
                                        </div>
                                        <div className='biography-column'>
                                            { actor.biography ? actor.biography : 'Unfortunately, we do not have any information available.'}
                                        </div>
                                    </Grid.Row>
                                    <Grid.Row columns={2}>
                                        <Grid.Column>
                                            
                                        </Grid.Column>
                                    </Grid.Row>
                                </div>
                            </Grid.Column>

                            <Grid.Column width={6}>
                                <Grid.Row  className='actor-details-name'>
                                    <h2 >{actor.name}</h2>
                                </Grid.Row>

                                <Grid.Row>
                                    <div>
                                        <Image
                                            src={imgSrc}
                                            size='large'
                                        />
                                    </div>
                                </Grid.Row>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <Divider 
                        horizontal
                        className='actor-details-divider'
                    >
                        Other TV Series
                    </Divider>
                    <div className='cards-container'>
                        {actor.tv_credits.cast.map(show => (
                            <ShowCard
                                show={show}
                                key={uuidv5()}
                            />
                        ))}
                    </div>
                </div>
                :
                <LoadingImage />
        )
    }
}

const mapStateToProps = state => {
    return {
        actor: state.actorDetails
    }
}

export default withRouter(connect(mapStateToProps, actions)(ActorDetails));

// <div>
//     
//     <h5>{actor.birthday}</h5>
//     
//     
// </div>
//                 :
// <LoadingImage />