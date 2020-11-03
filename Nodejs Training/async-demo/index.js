console.log('Before');

/*
const p	= getUser(1, (user) => {
  getRepositories(user.gitHubUsername, (repos) => {
    getCommits(repos[0], (commits) => {
      console.log(commits);
    })
  })
});
*/
/*
getUser(1)
	.then(user		=> getRepositories(user))
	.then(repos		=> getCommits(repos))
	.then(commits	=> console.log('Commits', commits))
	.catch(err		=> console.log('Error', err.message));
*/

async function displayCommits() {
	try {
		const user		= await getUser(1);
		const repos		= await	getRepositories(user);
		const commits	= await getCommits(repos);
		console.log('Commits', commits);
	}
	catch (err) {
		console.log('Error', err.message);
	}
}

displayCommits();

console.log('After');

function getUser(id) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			console.log('Reading a user from a database...');
			resolve({ id: id, gitHubUsername: 'Pablin' });
		}, 2000);
	});
}

function getRepositories(username) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
    		console.log('Calling GitHub API...');
    		//resolve(['repo1', 'repo2', 'repo3']);
			reject(new Error('Some shit has happened.'));
  		}, 2000);
	});
}

function getCommits(repo) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
    		console.log('Calling GitHub API...');
		    resolve(['commit']);
  		}, 2000);
	});
}