const lib   = require('../lib');
const db    = require('../db');
const mail  = require('../mail');

describe('absolute', () => {
    it('Should return a positive number if input is positive', () => {
    const result   = lib.absolute(1);
        expect(result).toBe(1);
    });
    
    it('Should return a positive number if input is negative', () => {
        const result   = lib.absolute(-1);
        expect(result).toBe(1);
    });
    
    it('Should return 0 if input is 0', () => {
        const result   = lib.absolute(0);
        expect(result).toBe(0);
    });
});

describe('greet', () => {
    it('should return the greeting message plus the name passed.', () => {
        const name      = 'Pablin'
        const result    = lib.greet(name);
        expect(result).toContain(name);
    });
});

describe('getCurrencies', () => {
    it('should return an array containing the valid currencies.', () => {
        const result    = lib.getCurrencies();
        expect(result).toEqual(expect.arrayContaining([ 'USD', 'EUR', 'AUD' ]));
    });
});

describe('getProduct', () => {
    it('should return the product with the given ID', () => {
        const result    = lib.getProduct(1);
        // Exact comparison. Too specific. If the object returned has other properties, the test will fail
        expect(result).toEqual({ id: 1, price: 10 });

        // With this method, the test checks if the object contains theese properties.
        expect(result).toMatchObject({ id: 1, price: 10 });

        // Test for specific property. Watch the variable type.
        expect(result).toHaveProperty('id', 1);
        //expect(result).toEqual('id', '1'); // Will fail. The id prop is a number.
    });
});

describe('registerUser', () => {
    it('should throw if username is falsy',  () => {
        // Falsy values: null, undefined, '', 0, false, NaN
        const falsies   = [ null, undefined, NaN, '', 0, false ];

        falsies.forEach(a => {
            expect(() => { lib.registerUser(a)}).toThrow(); 
        });
    });

    it('should return a user object if valid username is passed', () => {
        const username  = 'Pablin';
        const result    = lib.registerUser(username);
        expect(result).toMatchObject({ username });
        expect(result.id).toBeGreaterThan(0);
    });
});

describe('applyDiscount', () => {
    // Let's change the getCustomerSync function to a fake one
    db.getCustomerSync  = function(customerId) {
        return { id: customerId, points: 20 };
    }

    const order = { customerId: 1, totalPrice: 10 }
    lib.applyDiscount(order);
    expect(order.totalPrice).toBe(9);
});

describe('notifyCustomer', () => {
    it('should send an email to the customer', () => {
        // jest.fn() returns a function with no implementation, that is, no code at all
        //const mockFunction  = jest.fn();
        // This tells the function to return the value of 1
        //mockFunction.mockReturnValue(1);
        // We can also set the return value as a promise
        //mockFunction.mockResolvedValue(1);
        // A rejected promise...
        //mockFunction.mockRejectedValue(new Error('Some shit has happened...'));
        // If the return value is a promise, we have to await the result
        //const result    = await mockFunction();
    
        db.getCustomerSync  = jest.fn().mockReturnValue({ email: 'a' });
        mail.send           = jest.fn();
    
        lib.notifyCustomer({ customerId: 1 });
    
        // The method toHaveBeenCalled works only with jest mock functions.
        expect(mail.send).toHaveBeenCalled();

        // mock.calls keeps track of all the calls to the function.
        // It returns an array with all the calls and every item has an array with the arguments of each
        // call so, with this line we check that the first argument of the first call is 'a'
        expect(mail.send.mock.calls[0][0]).toBe('a');
        // And now we check that te second argument contains 'order'
        expect(mail.send.mock.calls[0][1]).toMatch(/order/);
    });
});