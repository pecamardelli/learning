const assert    = require('assert');
const config    = require('config');
const jwt		= require('jsonwebtoken');
const { User }  = require('../../../models/model_user');

describe('generateAuthToken', () => {
    it('sould return a valid json web token', () => {
        const user      = new User({ _id: 1, isAdmin: true });

        const privKey   = 'bitch';
        config.get      = (string) => { return privKey };

        const token     = user.generateAuthToken();
        const decoded   = jwt.verify(token, config.get('jwtPrivateKey'));
        
        assert.equal(decoded._id, user._id);
        assert.equal(decoded.isAdmin, user.isAdmin);
    });
});

/*

describe('generateAuthToken', () => {
    it('should return a valid json web token', () => {
        const user      = new User;
        user._id        = 'jh34jh34';
        user.isAdmin    = false;

        const token     = user.generateAuthToken();
        const decoded   = jwt.verify(token, config.get('jwtPrivateKey'));

        expect(decoded._id).toBe(user._id);
        expect(decoded.isAdmin).toBe(user.isAdmin);
    });
});
*/