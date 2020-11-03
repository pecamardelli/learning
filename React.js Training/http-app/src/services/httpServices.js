import axios from 'axios';
import { toast } from 'react-toastify';

// Set up axios interceptor for all the responses from the server.
// First parameter is the function that will be executed when the request succeeded.
// The second one will execute on error.
axios.interceptors.response.use(null, error => {
	// Check if we are dealing with an expected error or not. 400 to 499 are expected error statuses.
	const expectedError	= error.response && error.response.status >= 400 && error.response.status < 500;
	
	if(!expectedError) {
		console.log('Logging the error', error);
		toast.error('Some unexpected shit has happened on the server. Unable to delete post...');
	}
	
	// Need to return a rejected promise to pass control to the catch block
	return Promise.reject(error);
});

export default {
	get:	axios.get,
	put:	axios.put,
	post:	axios.post,
	delete:	axios.delete
};