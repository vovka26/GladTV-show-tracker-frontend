import React, { Fragment } from 'react';
import { Menu, Image } from 'semantic-ui-react';
import { withRouter, NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../redux/actions'
import logo from '../logo.png'


const Navbar = (props) => {
    const { location: { pathname }, userLogout, currentUser } = props
    return (
        <Menu pointing secondary className='navbar' size='large'>
            {currentUser ? (
                <Fragment>
                    <Menu.Item 
                        as={Link}
                        className='navbar-logo'
                        to='/'
                    >
                        <Image src={logo} size='mini' />
                    </Menu.Item>
                    <Menu.Item
                        as={NavLink}
                        to='/home'
                        name="Home"
                        active={pathname === '/home'}
                    />
                    <Menu.Item
                        as={NavLink}
                        to='/watchlist'
                        name="Show List"
                        active={pathname === '/watchlist'}
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
                    <Fragment>
                        <Menu.Item 
                        as={Link}
                        className='navbar-logo'
                        to='/'
                        >
                            <Image src={logo} size='mini' />
                        </Menu.Item>
                        <Menu.Item
                            as={NavLink}
                            to='/'
                            name="Home"
                            active={pathname === '/'}
                        />
                         <Menu.Item
                            position='right'
                            as={NavLink}
                            to='/login'
                            name="Login"
                            active={pathname === '/login'}
                        />
                        <Menu.Item
                            // position='right'
                            as={NavLink}
                            to='/signup'
                            name="Signup"
                            active={pathname === '/signup'}
                        />
                    </Fragment>
                )
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