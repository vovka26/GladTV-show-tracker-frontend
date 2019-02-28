import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import * as actions from '../redux/actions';

import { Form, Button, Segment, Grid } from 'semantic-ui-react';
import { Redirect, Link } from 'react-router-dom';

class SignUp extends PureComponent {
    state = {
        firstName: '',
        lastName: '',
        username: '',
        password: ''
    }

    onChange = (e, { name, value }) => {
        this.setState({
            [name]: value
        })
    }

    onSubmit = () => {
        this.props.createUser(this.state)
    }

    render() {
        const { firstName, lastName, username, password } = this.state
        return (
            localStorage.token ? <Redirect to='/watchlist' /> :
                <Segment
                    placeholder
                    className='login-signup'
                >
                    <Grid relaxed='very' stackable>
                        <Grid.Column>
                            <Form onSubmit={this.onSubmit}>
                                <h3>Create New User</h3>
                                <Form.Input
                                    // label='First Name'
                                    placeholder='First Name'
                                    name='firstName'
                                    value={firstName}
                                    onChange={this.onChange}
                                />
                                <Form.Input
                                    // label='Last Name'
                                    placeholder='Last Name'
                                    name='lastName'
                                    value={lastName}
                                    onChange={this.onChange}
                                />
                                <Form.Input
                                    // label='Username'
                                    placeholder='Username'
                                    name='username'
                                    value={username}
                                    onChange={this.onChange}
                                />
                                <Form.Input
                                    type='password'
                                    // label='Password'
                                    placeholder='Password'
                                    name='password'
                                    value={password}
                                    onChange={this.onChange}
                                />
                                <Button 
                                    content='Create' 
                                    type='submit'
                                />
                            </Form>
                            <div>
                                Have an account? {<Link to='/login'>Login</ Link>}
                            </div>
                        </Grid.Column>
                    </Grid>
                </Segment>
        )
    }
}

// const mapStateToProps = state => {
//     return {
//         currentUser: state.currentUser
//     }
// }

export default connect(null, actions)(SignUp);