const { Rental, validate }    = require('../../models/model_rental');
const request       = require('supertest');
const { User }      = require('../../models/model_user');
const { Movie }     = require('../../models/model_movie');
const { Genre }     = require('../../models/model_genre');
const mongoose      = require('mongoose');

describe('/api/returns', () => {
    let server;
    let token;
    let customerId;
    let movieId;
    let rental;
    let movie;

    beforeEach(async () => {
        server = require('../../index');

        customerId  = mongoose.Types.ObjectId();
        movieId     = mongoose.Types.ObjectId();
        token       = new User().generateAuthToken();

        movie   = new Movie({
            _id:                movieId,
            title:              'Great Title',
            genre:              { name: 'The Great Genre'},
            dailyRentalRate:    2,
            numberInStock:      5
        });

        await movie.save();

        rental    = new Rental({
            customer: {
                _id:    customerId,
                name:   '12345',
                phone:  '123456'
            },
            movie: {
                _id:                movieId,
                title:              '12345',
                dailyRentalRate:    2
            }
        });

        await rental.save();
    });
    
    afterEach(async () => {
        await server.close();
        Rental.collection.deleteMany({});
        Movie.collection.deleteMany({});
    });

    
    describe('POST /', () => {
        const exec  = () => {
            return request(server)
                .post('/api/returns')
                .set('x-auth-token', token)
                .send({ customerId, movieId });
        };

        it('should return a 401 status if client is not logged in', async () => {
            // We don't need the token for this test
            token   = '';
    
            const res   = await exec();
    
            expect(res.status).toBe(401);
        });

        it('should return a 400 status if customer Id is not provided', async () => {
            customerId = '';

            const res  = await exec();
    
            expect(res.status).toBe(400);
        });

        it('should return a 400 status if movie Id is not provided', async () => {
            movieId     = '';

            const res   = await exec();
            
            expect(res.status).toBe(400);
        });

        it('should return a 404 status if no rental is found for the movie/customer combination', async () => {
            customerId  = mongoose.Types.ObjectId();
            movieId     = mongoose.Types.ObjectId();

            const res   = await exec();
            
            expect(res.status).toBe(404);
        });

        it('should return a 400 status if rental has already been processed', async () => {
            rental.dateReturn   = Date.now();
            await rental.save();

            const res   = await exec();
            
            expect(res.status).toBe(400);
        });

        it('should return a 200 status if request is valid', async () => {
            const res   = await exec();
            
            expect(res.status).toBe(200);
        });

        it('should set the dateReturn of the return object', async () => {
            const res   = await exec();
            
            const rentalInDb    = await Rental.findById(rental._id);
            // In order to check if the date has been set and is a valid timestamp
            // we can chech the difference between te current time and the time
            // we get from the rental. Let's put a maximum difference of 10 secs
            const diff  = Date.now() - rentalInDb.dateReturn;   // The diff will be in milliseconds

            expect(diff).toBeLessThan(10 * 1000);
        });

        it('should calculate the rentalFee', async () => {
            rental.dateOut  = Date.now() - 10 * 84600000;
            await rental.save();

            const res   = await exec();
            
            const { dateOut, dateReturn, rentalFee, movie }    = await Rental.findById(rental._id);

            expect(dateOut).toBeDefined();
            expect(dateReturn).toBeDefined();
            expect(rentalFee).toBeDefined();
            expect(movie.dailyRentalRate).toBeGreaterThanOrEqual(0);

            const daysOut   = Math.ceil((dateReturn - dateOut) / 84600000);
            const rentalFeeShouldBe = daysOut * movie.dailyRentalRate;
            
            expect(rentalFeeShouldBe).toBe(rentalFee);
        });

        it('should increase the stock of the movie', async () => {
            const res   = await exec();

            const movieInDb    = await Movie.findById(movieId);
            
            expect(movieInDb.numberInStock).toBe(movie.numberInStock + 1);
        });
        
        it('should return the processed rental', async () => {
            const { body }  = await exec();
            
            //const rentalInDb    = await Rental.findById(rental._id);
            
            expect(Object.keys(body)).toEqual(expect.arrayContaining([
                'dateOut', 'dateReturn', 'rentalFee', 'customer', 'movie'
            ]));
        });
    })
});