const { genreSchema }   = require('./model_genre');
const	Joi			    = require('joi');
const	mongoose	    = require('mongoose');

const Movie		= mongoose.model('Movie', new mongoose.Schema({
	title: {
		type:		String,
        required:	true,
        trim:       true,
		minlength:	1,
        maxlength:	64,
        default:    ''
    },
    genre: {
        type:       genreSchema,
        required:   true
    },
    numberInStock: {
        type:       Number,
        required:   true,
        min:        0,
        max:        100
    },
    dailyRentalRate: {
        type:       Number,
        required:   true,
        min:        0,
        max:        10
    }
}));

function validateMovie(movie) {
	const schema	= Joi.object({
        title:              Joi.string().min(1).max(64).required(),
        genreId:            Joi.objectId().required(),
        numberInStock:      Joi.number().min(0).max(100).required(),
        dailyRentalRate:    Joi.number().min(0).max(10).required()
	});
	
	return schema.validate(movie);
}

exports.Movie		= Movie;
exports.validate	= validateMovie;