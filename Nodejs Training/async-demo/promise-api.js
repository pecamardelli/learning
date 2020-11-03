
const p1	= new Promise((resolve, reject) => {
	setTimeout(() => {
		console.log('promise 1...');
		resolve(1);
		//reject(new Error('Some shit has happened.'));
	}, 2000);
});

const p2	= new Promise((resolve) => {
	setTimeout(() => {
		console.log('promise 2...');
		resolve(2);
	}, 3000);
});

Promise.race([p1, p2])
	.then(result	=> console.log('Results', result))
	.catch(error	=> console.log(error.message));