import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Image } from 'semantic-ui-react';
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
                            key={uuidv5()}
                        />
                    ))}
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