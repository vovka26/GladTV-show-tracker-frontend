import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Image } from 'semantic-ui-react';
import * as actions from '../redux/actions';
import noActorImg from '../noImageActor.png';
import ShowCard from '../containers/ShowCard';
import { Dimmer, Loader } from 'semantic-ui-react';

class ActorDetails extends PureComponent {

    componentWillMount() {
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
                <div>
                    <h3>{actor.name}</h3>
                    <h5>{actor.birthday}</h5>
                    <Image
                        src={imgSrc}
                        size='medium'
                    />
                    {actor.tv_credits.cast.map(show => (
                        <ShowCard
                            show={show}
                            key={show.id}
                        />
                    ))}
                </div>
                :
                <Dimmer active inverted>
                    <Loader 
                        size='huge' 
                        inverted
                        content='Loading'
                    />
                </Dimmer>
        )
    }
}

const mapStateToProps = state => {
    return {
        actor: state.actorDetails
    }
}

export default withRouter(connect(mapStateToProps, actions)(ActorDetails));