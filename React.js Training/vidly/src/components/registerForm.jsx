import React from 'react';
import Joi from 'joi-browser';
import { toast } from 'react-toastify';
import Form from './common/form';
import { register } from '../services/userService';
import auth from '../services/authService';

class RegisterForm extends Form {
	state	= {
		data: { username: '', name: '', password: '' },
		errors: {}
	};
	
	schema	= {
		username:	Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().label('Email'),
		name:		Joi.string().min(5).max(32).required().label('Name'),
		password:	Joi.string().min(8).max(64).required().label('Password')
	};
	
	doSubmit = async() => {
		try {
			const new_user	= { ...this.state.data };
			const response	= await register(new_user);
			// The backend has to send the jason web token in order to login from here and
			// avoid the need of logging in from the form.
			// The web token can be on the header of the http response or within the body.
			auth.loginWithJwt(response.headers['x-auth-token']);
			toast.success(`User '${this.state.data.name}' succesfully registered!`);
			// Using the history object to move to the home page will not re-render the app component
			// We need to do a full page reload to update the navbar with the name of the logged in user
			// as well as the logout link.
			//this.props.history.push('/movies');
			window.location	= '/';
		}
		catch (ex) {
			if(ex.response && ex.response.status === 400) {
				const errors	= { ...this.state.errors };
				errors.username	= ex.response.data;
				this.setState({ errors });
				return toast.error(`Error: ${ex.response.data}`);	
			}
		}
	};
	
	render() {
		
		
		return (
			<React.Fragment>
				<h1>Register</h1>
				<form onSubmit={this.handleSubmit}>
					{ this.renderInput('username', 'Email', 'email', null, true) }
					{ this.renderInput('name', 'Name') }
					{ this.renderInput('password', 'Password', 'password')} 
					{ this.renderButton('Register') }
				</form>
			</React.Fragment>
		);
	}
}

export default RegisterForm;