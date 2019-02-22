import React from 'react'; 
import { connect } from 'react-redux';

const ShowDetails = (props) => {

    return(
        <div>
            {!props.show ? null : props.show.name}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        show: state.showDetails
    }
}

export default connect(mapStateToProps)(ShowDetails);

