import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import * as actions from '../redux/actions';

import { Form, Button } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';

class SignUp extends PureComponent {
    state = {
        firstName: '', 
        lastName: '', 
        username: '', 
        password: ''
    }

    onChange = (e, {name, value}) => {
        this.setState({
            [name]: value
        })
    }

    onSubmit = () => {
        this.props.createUser(this.state)
    }

    render(){
        const { firstName, lastName, username, password } = this.state
        const { currentUser } = this.props
        debugger
        return(
            currentUser ? <Redirect to='/watchlist' /> :
            <Form onSubmit={this.onSubmit}>
                <Form.Input 
                    label='First Name'
                    placeholder='First Name'
                    name='firstName'
                    value={firstName}
                    onChange={this.onChange}
                />                
                <Form.Input 
                    label='Last Name'
                    placeholder='Last Name'
                    name='lastName'
                    value={lastName}
                    onChange={this.onChange}
                />
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
                <Button>Create User </Button>
            </Form>
        )
    }
}

const mapStateToProps = state => {
    return {
        currentUser: state.currentUser
    }
}

export default connect(mapStateToProps, actions)(SignUp);