import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Movies			from './components/movies';
import MovieForm		from './components/movieForm';
import Customers		from './components/customers';
import Rentals			from './components/rentals';
import NotFound			from './components/common/not-found';
import NavBar			from './components/common/navBar';
import LoginForm		from './components/loginForm';
import RegisterForm		from './components/registerForm';
import Logout			from './components/logout';
import ProtectedRoute	from './components/common/protectedRoute';
import auth				from './services/authService';
//import logger			from './services/logService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

class App extends Component {
	state	= {};
	
	componentDidMount() {
		const user	= auth.getCurrentUser();
		this.setState({ user });
	}
	
	render() {
		const { user } = this.state;
		
		return (
			<React.Fragment>
			<ToastContainer />
				<NavBar user={this.state.user}/>
				<main className='container'>
					<Switch>
						<Route path='/register'		component={RegisterForm} />
						<Route path='/login'		component={LoginForm} />
						<ProtectedRoute
							path='/movies/:id'
							component={MovieForm}
						/>
						<Route
							path='/movies'
							render={props => <Movies {...props} user={this.state.user}/>}
						/>
						<ProtectedRoute
							path='/movies/new'
							component={MovieForm}
						/>
						<Route path='/customers'	component={Customers} />
						<Route path='/rentals'		component={Rentals} />
						<Route path='/logout'		component={Logout} />
						<Route path='/not-found'	component={NotFound} />
						<Redirect from='/' to='/movies' />
						<Redirect to='/not-found' />
					</Switch>
				</main>
			</React.Fragment>
		);
	}
}

export default App;
