const { User }  = require('../../../models/model_user');
const auth      = require('../../../middleware/middle_auth');
const mongoose  = require('mongoose');

describe('auth middleware', () => {
    it('should populate req.user payload with a valid jwt', () => {
        const user  = { _id: mongoose.Types.ObjectId().toHexString(), isAdmin: true };
        const token = User(user).generateAuthToken();
        
        const req   = {
            header: jest.fn().mockReturnValue(token)
        };

        const res   = {};
        const next  = jest.fn();

        auth(req, res, next);
        expect(req.user).toMatchObject(user);
    });
});