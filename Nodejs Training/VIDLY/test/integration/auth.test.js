const request   = require('supertest');
const { User }  = require('../../models/model_user');
const { Genre } = require('../../models/model_genre');

describe('auth middleware', () => {
    // Require the server object before each test to avoid the exception
    // raised when requiring the server again at the nex test.
    beforeEach(() => {
        server  = require('../../index');
        token   = new User().generateAuthToken();
    });
    // Close the server after each test.
    afterEach(async () => {
        await server.close();
        await Genre.collection.deleteMany({});
    });

    let token;

    const exec  = () => {
        return request(server)
            .post('/api/genres')
            .set('x-auth-token', token)
            .send({ name: 'Genre1' });
    };

    it('should return 401 if no token is provided', async () => {
        token = '';
        
        const res   = await exec();

        expect(res.status).toBe(401);
    });

    it('should return 400 if token is invalid', async () => {
        token = 'a';
        
        const res   = await exec();

        expect(res.status).toBe(400);
    });

    it('should return 200 if token is valid', async () => {
        const res   = await exec();

        expect(res.status).toBe(200);
    });
});