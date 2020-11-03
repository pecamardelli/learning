const auth                  = require('../middleware/middle_auth');
const express	            = require('express');
const { Rental, validate }  = require('../models/model_rental');
const { Movie }             = require('../models/model_movie');
const validateInput         = require('../middleware/middle_validate');

const router	= express.Router();

router.post('/', [ auth, validateInput(validate) ], async (req, res) => {
    // Check if movie/customer combination exists in DB
    const rental    = await Rental.lookup(req.body.customerId, req.body.movieId);

    if(!rental) return res.status(404).send('Rental not found.');

    // Check if rental has been processed
    if(rental.dateReturn) return res.status(400).send('Rental is already processed.');

    // Everything is valid so far. Let's process the return.
    rental.return();

    

    await rental.save();

    const mov = await Movie.findByIdAndUpdate(
        rental.movie._id,
        { $inc: { numberInStock: 1 } },
        { new:  true } 
    );
    
    res.send(rental);
});

module.exports = router;