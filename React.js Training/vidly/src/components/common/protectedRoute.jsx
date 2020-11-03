import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../services/authService';

const ProtectedRoute	= ({ component: Component, render, ...rest }) => {
	return (
		<Route
			{...rest}
			render={props => {
				if(!auth.getCurrentUser()) {
					toast.error('Unauthorized, baby! Please log in.');
					return (
						<Redirect to={{
							pathname: '/login',
							state: { from: props.location }
							}}
						/>
					);
				} 
				return Component ? <Component {...props} /> : render=(props);
			}}
		/>
	);
};

export default ProtectedRoute;