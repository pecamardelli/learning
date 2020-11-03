const request   = require('supertest');
const { Genre } = require('../../models/model_genre');
const { User }  = require('../../models/model_user');
const mongoose  = require('mongoose');

let server;

describe('/api/genres', () => {
    // Require the server object before each test to avoid the exception
    // raised when requiring the server again at the nex test.
    beforeEach(() => { server = require('../../index'); });
    // Close the server after each test.
    afterEach(async () => {
        await server.close();
        await Genre.collection.deleteMany({});
    });

    describe('GET /', () => {
        it('should return all genres', async () => {
            const genres    = [
                { name: 'Genre1' },
                { name: 'Genre2' },
                { name: 'Genre3' },
                { name: 'Genre4' },
                { name: 'Genre5' }
            ];

            await Genre.collection.insertMany(genres);

            const res   = await request(server).get('/api/genres');
            //expect(res.status).toBe(200);
            expect(res.body.map(g => g.name)).toEqual(genres.map(g => g.name));
        });
    });

    describe('GET /:id', () => {
        it('should return the genre with the given ID if it is valid', async () => {
            const new_genre = { name: 'Great Genre' };

            const { insertedId } = await Genre.collection.insertOne(new_genre);
            
            const res   = await request(server).get(`/api/genres/${insertedId}`);
            expect(res.body).toHaveProperty('name', new_genre.name);
        });

        it('should return a 404 error if Id is not found on DB', async () => {
            // Generate a random ObjectId from mongoose
            const id = mongoose.Types.ObjectId();

            const res   = await request(server).get(`/api/genres/${id}`);
            
            expect(res.status).toBe(404);
        })

        it('should return a 404 error when passing an invalid ID', async () => {
            const res   = await request(server).get(`/api/genres/1234`);

            expect(res.status).toBe(404);
        })
    });

    describe('POST /', () => {
        let token;
        let name;

        beforeEach(() => {
            token   = new User().generateAuthToken();
            name    = 'The new Genre';
        });

        // This is our happy path
        const exec  = async () => {
           return await request(server)
                .post('/api/genres')
                .set('x-auth-token', token)
                .send({ name });
        };

        it('should return a 401 status if client is not logged in', async () => {
            // We don't need the token for this test
            token   = '';

            const res   = await exec();

            expect(res.status).toBe(401);
        });

        it('should return a 400 status if genre is less than 5 characters long', async () => {
            //const token = new User().generateAuthToken();
            name    = '1234';
            
            const res   = await exec();

            expect(res.status).toBe(400);
        });

        it('should return a 400 status if genre is more than 50 characters long', async () => {
            name    = new Array(52).join('x');

            const res   = await exec();

            expect(res.status).toBe(400);
        });

        it('should save the genre in the database if it is valid', async () => {
            name    = 'The Great Genre';

            const res   = await exec();

            const result    = await Genre.find({ name });

            expect(result[0]).toHaveProperty('_id');
            expect(result[0]).toHaveProperty('name', name);
        });
    });

    describe('PUT /:id', () => {
        let token;
        let name;
        let id;

        beforeEach(async () => {
            token                   = new User().generateAuthToken();
            const { insertedId }    = await Genre.collection.insertOne({ name: 'The Great Genre' });
            id                      = insertedId;
        });

        async function exec() {
            return await request(server)
                .put(`/api/genres/${id}`)
                .set('x-auth-token', token)
                .send({ name });
        }

        it('should return a 401 status if client is not logged in', async () => {
            // We don't need the token for this test
            token   = '';

            const res   = await exec();

            expect(res.status).toBe(401);
        });

        it('should return a 400 status if genre is less than 5 characters long', async () => {
            name    = '1234';
            
            const res   = await exec();

            expect(res.status).toBe(400);
        });

        it('should return a 400 status if genre is more than 50 characters long', async () => {
            name    = new Array(52).join('x');

            const res   = await exec();

            expect(res.status).toBe(400);
        });
    
        it('should return the genre with the given ID if it is valid', async () => {
            name = 'Great Genre';
            
            const res   = await exec();

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('name', name);
        });

        it('should return a 404 error if the given genre ID does not exist', async () => {
            id  = mongoose.Types.ObjectId();
            
            const res   = await exec();

            expect(res.status).toBe(404);
        });
    });

    describe('DELETE /:id', () => {
        let token;
        const name = 'hello world';
        let id;

        beforeEach(async () => {
            token                   = new User({ isAdmin: true }).generateAuthToken();
            const { insertedId }    = await Genre.collection.insertOne({ name });
            id                      = insertedId;
        });

        async function exec() {
            return await request(server)
                .delete(`/api/genres/${id}`)
                .set('x-auth-token', token);
        }
    
        it('should return a 401 status if client is not logged in', async () => {
            // We don't need the token for this test
            token   = '';

            const res   = await exec();

            expect(res.status).toBe(401);
        });

        it('should return the deleted object if it has been found', async () => {
            const res   = await exec();

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('name', name);
        });

        it('should return a 404 error if the given genre ID does not exist', async () => {
            id  = mongoose.Types.ObjectId();
            
            const res   = await exec();

            expect(res.status).toBe(404);
        });

        it('should return a 403 status if client is not an admin', async () => {
            token                   = new User().generateAuthToken();

            const res   = await exec();

            expect(res.status).toBe(403);
        });
    });
});

if(server) server.close();