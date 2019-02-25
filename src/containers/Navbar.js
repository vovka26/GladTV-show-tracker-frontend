import React, { Fragment } from 'react';
import { Menu } from 'semantic-ui-react';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../redux/actions'


const Navbar = (props) => {
    const { location: { pathname }, userLogout, currentUser} = props
    return(
        <Menu pointing secondary>
            {currentUser ? (
                <Fragment>
                    <Menu.Item 
                        as={NavLink}
                        to='/watchlist'
                        name="Show List"
                        active={ pathname === '/watchlist'}
                    />
                    <Menu.Menu position='right'> 
                        <Menu.Item 
                            name={`Hey ${currentUser.username}`}
                        />
                        <Menu.Item 
                            name='Logout'
                            onClick={userLogout}
                        />
                    </Menu.Menu>
                </Fragment>
            ) : (
                <Fragment>
                <Menu.Item 
                    as={NavLink}
                    to='/login'
                    name="Login"
                    active={pathname === '/login'}
                />
                <Menu.Item 
                    as={NavLink}
                    to='/signup'
                    name="SignUp"
                    active={pathname === '/signup'}
                />
                </Fragment>)
            }  
        </Menu>
    )
}

const mapStateToProps = state => {
    return {
        currentUser: state.currentUser
    }
}

export default withRouter(connect(mapStateToProps, actions)(Navbar));