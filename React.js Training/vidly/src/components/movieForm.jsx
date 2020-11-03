import React from 'react';
import { getGenres } from '../services/genreService';
import { getMovie, saveMovie } from '../services/movieService';
import { toast } from 'react-toastify';
import Joi from 'joi-browser';
import Form from './common/form';

class MovieForm extends Form {
	state	= {
		data: { _id: 'none', title: '', genreId: '', numberInStock: '', dailyRentalRate: '' },
		genres: [],
		errors: {}
	};
	
	async populateGenres() {
		try {
			var { data: genres }	= await getGenres();
		}
		catch (ex) {
			if(ex.response) return;
		}
		
		this.setState({ genres });
	}
	
	async populateMovie() {
		try {
			const movieId	= this.props.match.params.id;
			if(movieId === 'new') return;
			var { data: movie }	= await getMovie(movieId);
		}
		catch (ex) {
			if(ex.response && ex.response.status === 404) return this.props.history.replace('/not-found');
		}
		
		const data	= {
			_id: movie._id,
			title: movie.title,
			genreId: movie.genre._id,
			numberInStock: movie.numberInStock,
			dailyRentalRate: movie.dailyRentalRate
		};
		
		this.setState({ data });
	}
	
	async componentDidMount() {
		await this.populateGenres();
		await this.populateMovie();
	}
	
	schema	= {
		_id:				Joi.string().max(64).required(),
		title:				Joi.string().max(64).required().label('Title'),
		genreId:			Joi.string().min(5).max(64).required().label('Genre'),
		numberInStock:		Joi.number().min(0).max(100).required().label('Stock'),
		dailyRentalRate:	Joi.number().min(0).max(10).required().label('Rate')
	};
	
	doSubmit = async () => {
		const the_movie	= { ...this.state.data };
		
		try {
			saveMovie(the_movie);
		}
		catch (ex) {
			toast.error(`Unable to save movie: ${ex}`)
		}
		
		//console.log(saved);
		this.props.history.push('/movies');
	};
	
	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				{ this.renderInput('title', 'Title', 'text', null, true) }
				{ this.renderSelect('genreId', 'Genre', this.state.genres) }
				{ this.renderInput('numberInStock', 'Stock', 'number')}
				{ this.renderInput('dailyRentalRate', 'Rate', 'number')}
				{ this.renderButton('Save') }
			</form>
		);
	}
}

export default MovieForm;