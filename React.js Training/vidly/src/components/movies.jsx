import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteMovie, getMovies } from '../services/movieService';
import { getGenres } from '../services/genreService';
import MoviesTable from './moviesTable';
import ListGroup from './common/listGroup';
import Pagination from './common/pagination';
import Input from './common/input';
import _ from 'lodash';

class Movies extends Component {
	state	= {
		movies: [],
		genres: [],
		searchString: '',
		pageSize: 4,
		selectedGenre: { _id: '', name: 'All genres'},
		currentPage: 0,
		sortColumn: { path: 'title', order: 'asc' }
	};
	
	async componentDidMount() {
		const { data }			= await getGenres();
		const genres			= [ { id: '', name: 'All genres' }, ...data ];
		const { data: movies }	= await getMovies();
		this.setState({ movies, genres });
	}
	
	handleDelete	= async movie => {
		// Now we're talking to a backend service. We turned into pesimists...
		const originalMovies	= [ ...this.state.movies ];
		const movies			= originalMovies.filter(m => m._id !== movie._id);
		this.setState({ movies });
		
		//const { data: movies }	= await getMovies();
		
		try {
			await deleteMovie(movie._id);
		}
		catch (ex) {
			if(ex.response && ex.response.status === 404) {
				toast.error('This movie has already been deleted.');
			}
			if(ex.response && ex.response.status === 401) {
				toast.error('Only logged in users can delete.');
			}
			else {
				toast.error(`Unexpected error: ${ex.response.data}`);
			}
			
			this.setState({ movies: originalMovies });
		}
	}
	
	handleLike	= movie => {
		const movies		= [...this.state.movies];
		const index			= movies.indexOf(movie);
		movies[index]		= { ...movies[index] };
		movies[index].liked	= !movies[index].liked; 
		this.setState({ movies });
	}

	handlePageChange	= page => this.setState({ currentPage: page.target.value });
	
	handleGenreSelect = genre => {
		this.setState({ selectedGenre: genre, currentPage: 0, searchString: '' });
	};
	
	handleSort	= sortColumn => {
		this.setState({ sortColumn });
	};
	
	getPagedData	= () => {
		const { currentPage, pageSize, selectedGenre, sortColumn }	= this.state;
		//const allMovies		= [ ...this.state.movies ];
		const allMovies		= this.filterMovies();
		const tempMovies	= selectedGenre && selectedGenre._id
				? allMovies.filter(m => m.genre._id === selectedGenre._id)
				: allMovies;
		const sorted		= _.orderBy(tempMovies, [sortColumn.path], [sortColumn.order]);
		const count			= sorted.length;
		const movies		= sorted.splice(currentPage*pageSize, pageSize);
		
		return { count, movies };
	};
	
	
	filterMovies() {
		const { movies, searchString }	= this.state;
		const filtered	= movies.filter(m => m.title.match(new RegExp(searchString, 'i')));
		return filtered;
	}
	
	handleSearch	= ({ currentTarget: input }) => {
		const searchString	= input.value;
		this.setState({ searchString, currentPage: 0, selectedGenre: { _id: '', name: 'All genres'} });
	};
	
	render() {
		const { currentPage, pageSize, selectedGenre, sortColumn, searchString }	= this.state;
		const { count, movies }	= this.getPagedData();
		const { user } = this.props;
				
		//if (count === 0) return <p>No movies in the database</p>;
		
		return (
			<div className='row'>
				<div className='col-3'>
					<ListGroup
						items={this.state.genres}
						selectedItem={selectedGenre}
						onItemSelect={this.handleGenreSelect}
					/>
				</div>
				<div className='col'>
					{user && (
						<Link
							to='/movies/new'
							className='btn btn-primary'
						>
						New movie
						</Link>
					)}
					
					<p>Showing { this.state.movies.length } movies</p>
					<Input
						name='search'
						placeholder='Search...'
						value={searchString}
						onChange={this.handleSearch}
						autoFocus={false}
						type='text'
					/>
					<MoviesTable 
						movies={movies}
						sortColumn={sortColumn}
						onLike={this.handleLike}
						onDelete={this.handleDelete}
						onSort={this.handleSort}
						onNewMovie={this.handleNewMovie}
					/>
					<Pagination
						pageSize={pageSize}
						itemCount={count}
						currentPage={currentPage}
						onPageChange={this.handlePageChange}
					/>
				</div>
			</div>
		);
	};
}

export default Movies;