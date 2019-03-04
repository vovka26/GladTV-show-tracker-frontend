import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, Embed } from 'semantic-ui-react';

class TrailerModal extends PureComponent {
    state = {
        dimmer: 'blurring'
    }

    render() {
        const { show } = this.props
        const video = show.videos.results[0]
        return (
            video ?
                <Modal
                    trigger={<Button content='Trailer' />}
                    dimmer='blurring'
                    size='large'
                    basic
                >
                    <Embed
                        id={video.key}
                        placeholder={`https://img.youtube.com/vi/${video.key}/hqdefault.jpg`}
                        iframe={{ allowFullScreen: true }}
                        source='youtube'
                    />
                </Modal>
                :
                null
        )
    }
}

const mapStateToProps = state => {
    return {
        show: state.showDetails
    }
}

export default connect(mapStateToProps)(TrailerModal);