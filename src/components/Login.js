import React, { PureComponent } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../redux/actions';

class Login extends PureComponent {
    state = {
        username: '',
        password: '',
    }

    onChange = (e, {name, value}) => {
        this.setState({
            [name]: value
        })
    }

    onSubmit = (e) => {
        this.props.userLogin(this.state.username, this.state.password)
    }

    render() {
        const { username, password} = this.state
        return (
            localStorage.getItem('token') ? <Redirect to='/watchlist' /> :
            <Form
                onSubmit={this.onSubmit}
            >
                <Form.Input
                    label='Username'
                    placeholder='Username'
                    name='username'
                    value={username}
                    onChange={this.onChange}
                />
                <Form.Input
                    type='password'
                    label='Password'
                    placeholder='Password'
                    name='password'
                    value={password}
                    onChange={this.onChange}
                />
                <Button type='submit'>Login</Button>
            </Form>
        )
    }
}

const mapStateToProps = state => {
    return {
        currentUser: state.currentUser 
    }
}

export default connect(mapStateToProps, actions)(Login);