/*
getCustomer(1, (customer) => {
  console.log('Customer: ', customer);
  if (customer.isGold) {
    getTopMovies((movies) => {
      console.log('Top movies: ', movies);
      sendEmail(customer.email, movies, () => {
        console.log('Email sent...')
      });
    });
  }
});
*/

emailCustomer();

async function emailCustomer() {
	try {
		const customer	= await getCustomer(1);
		console.log('Customer: ', customer);
		
		if (customer.isGold) {
			const topMovies	= await	getTopMovies();
			console.log('Top movies: ', topMovies);
			await	sendEmail(customer.email, topMovies);
			console.log('Email sent...');
		}
		else {
			console.log(`Customer ${customer.name} is not gold. Dont sending a shit.`);
		}
	}
	catch (err) {
		console.log('Error', err.message);
	}
}

function getCustomer(id) {
	return new Promise((resolve, reject) => {
		console.log('Getting customer...');
		setTimeout(() => {
		    resolve({ 
		      id: 1, 
		      name: 'Mosh Hamedani', 
		      isGold: false, 
		      email: 'email' 
		    });
		  }, 4000);
	});
}

function getTopMovies() {
	return new Promise((resolve, reject) => {
		console.log('Getting top movies...');
		setTimeout(() => {
			resolve(['movie1', 'movie2']);
		}, 4000);
	});
}

function sendEmail(email, movies) {
	return new Promise((resolve, reject) => {
		console.log('Sending mail...');
		setTimeout(() => {
			resolve();
		}, 4000);
	});
}