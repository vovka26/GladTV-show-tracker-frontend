import React, { PureComponent, Fragment } from 'react';
import { Form, Button, Segment, Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import * as actions from '../redux/actions';

class Login extends PureComponent {
    state = {
        username: '',
        password: '',
    }

    onChange = (e, { name, value }) => {
        this.setState({
            [name]: value
        })
    }

    onSubmit = (e) => {
        this.props.userLogin(this.state.username, this.state.password)
    }

    render() {
        const { username, password } = this.state
        return (
            this.props.currentUser ? <Redirect to='/watchlist' /> :
                <Fragment>
                    <video id="login-background" loop muted autoPlay playsInline poster={'https://static1.squarespace.com/static/58167399d2b857ceb9fd5059/t/5ae7f87b352f53431725b69f/1525151889635/433d83f7e481f35245f8c6bb7c7591d8.gif'}>
                        <source src={'https://static1.squarespace.com/static/58167399d2b857ceb9fd5059/t/5ae7f87b352f53431725b69f/1525151889635/433d83f7e481f35245f8c6bb7c7591d8.gif'} type="video/mp4" />
                    </video>
                <Segment
                    placeholder
                    className='login-signup'
                >
                    <Grid relaxed='very' stackable>
                        <Grid.Column>
                            <Form
                                onSubmit={this.onSubmit}
                            >
                                <h3>Login</h3>
                                <Form.Input
                                    icon='user'
                                    iconPosition='left'
                                    // label='Username'
                                    placeholder='Username'
                                    name='username'
                                    value={username}
                                    onChange={this.onChange}
                                />
                                <Form.Input
                                    icon='lock'
                                    iconPosition='left'
                                    type='password'
                                    // label='Password'
                                    placeholder='Password'
                                    name='password'
                                    value={password}
                                    onChange={this.onChange}
                                />
                                <Button
                                    type='submit'
                                    content='Login'
                                />
                            </Form>
                            <div>
                                Not a user? {<Link to='/signup'>Sign Up</ Link>}
                            </div>
                        </Grid.Column>
                    </Grid>
                </Segment>
                </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        currentUser: state.currentUser
    }
}

export default connect(mapStateToProps, actions)(Login);