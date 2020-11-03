const p	= new Promise(function(resolve, reject){
	// Make some async work here
	setTimeout(() => {
		//resolve(1);	// The promise changes from "pending" state to "resolved, fulfilled"
		
		// By convention, we must return an error object instead of a simple string.
		reject(new Error('Unknown error. Please, contact someone who knows what to do.'));	// The promise changes from "pending" state to "rejected"
	}, 2000);
});

p
	.then(result => console.log('Result', result))
	.catch(err => console.log('Error', err.message));