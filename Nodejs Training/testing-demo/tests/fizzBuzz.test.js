const fb    = require('../exercise1');

describe('fizzBuzz', () => {
    it('should throw if input is not a number', () => {
        const types = [
            undefined,
            Symbol,
            null,
            'hello world!',
            false,
            () => {},
            {}
        ];

        types.forEach(t => {
            expect(() => fb.fizzBuzz(t)).toThrow();
        });
    });

    it('should return FizzBuzz if input is divisible by 3 and 5', () => {
        const fbs       = [ 15, 30, 45, 60, 75, 90 ];

        fbs.forEach(n => {
            expect(fb.fizzBuzz(n)).toBe('FizzBuzz');
        });
    });

    it('should return Fizz if input is divisible by 3', () => {
        const fbs       = [ 3, 6, 9, 12, 18, 21 ];

        fbs.forEach(n => {
            expect(fb.fizzBuzz(n)).toBe('Fizz');
        });
    });

    it('should return Buzz if input is divisible by 5', () => {
        const fbs       = [ 5, 10, 20, 25, 35, 40, 50 ];

        fbs.forEach(n => {
            expect(fb.fizzBuzz(n)).toBe('Buzz');
        });
    });

    it('should return the input if it is not divisible by 3 or 5', () => {
        const fbs       = [ 1, 2, 4, 7, 8, 11, 13, 14, 16 ];

        fbs.forEach(n => {
            expect(fb.fizzBuzz(n)).toBe(n);
        });
    });
});