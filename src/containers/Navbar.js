import React, { Fragment } from 'react';
import { Menu } from 'semantic-ui-react';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../redux/actions'


const Navbar = (props) => {
    const { location: { pathname }, userLogout, currentUser} = props
    return(
        <Menu pointing secondary className='navbar'>
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
                            name={`Hey ${currentUser.first_name}`}
                        />
                        <Menu.Item 
                            name='Logout'
                            onClick={userLogout}
                        />
                    </Menu.Menu>
                </Fragment>
            ) : (
                <Menu.Item 
                    as={NavLink}
                    to='/login'
                    name="Login"
                    active={pathname === '/login'}
                /> )
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