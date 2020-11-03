import http from './httpServices';

export function getMovies() {
	return http.get('/movies');
};

export function getMovie(id) {
	return http.get(`/movies/${id}`);
};

export function saveMovie(movie) {
	const movie_to_save	= { ...movie };
	delete movie_to_save._id;
	
	if(movie._id !== 'none') return http.put(`/movies/${movie._id}`, movie_to_save);
	else return http.post('/movies', movie_to_save);
};

export function deleteMovie(id) {
	return http.delete(`/movies/${id}`);
};