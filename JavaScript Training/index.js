const _stack    = new WeakMap();

class Stack {
    constructor() {
        _stack.set(this, []);
    }

    get count() {
        return _stack.get(this).length;
    }

    push(item) {
        _stack.get(this).push(item);
    }

    pop() {
        if (this.count === 0) throw new Error('Stack is empty');

        return _stack.get(this).pop();
    }

    peek() {
        if (this.count === 0) throw new Error('Stack is empty');

        const stack = _stack.get(this);
        return stack[stack.length-1];
    }
}

const s = new Stack();
/*
function HtmlElement() {
    this.click  = function() {
        console.log('Clicked...');
    };
}

HtmlElement.prototype.focus = function() {
    console.log('Focused...');
};

const htmlElement   = new HtmlElement();

function HtmlSelectElement(...args) {
    this.items  = args;

    this.addItem    = function(item) {
        this.items.push(item);
    };

    this.removeItem = function(item) {
        this.items.splice(this.items.indexOf(item), 1);
    };

    this.render     = function() {
        let element = '<select>\n';
        
        for (let item of this.items)
            element += `  <option>${item}</option>\n`;

        element     += '</select>';
        return element;
    };
}

HtmlSelectElement.prototype = htmlElement;
HtmlSelectElement.prototype.constructor = HtmlSelectElement;

const s = new HtmlSelectElement(1,2,3,4,5);

function HtmlImageElement(source = '') {
    this.src    = source;

    this.render = function() {
        return `<img src="${this.src} />"`;
    };
}

HtmlImageElement.prototype = htmlElement;
HtmlImageElement.prototype.constructor = HtmlImageElement;

const elementArray  = [
    new HtmlSelectElement(1,2,3,4,5),
    new HtmlImageElement('http://picsum.photo/200')
];

for (let element of elementArray)
    console.log(element.render());

function Stopwatch() {
    let started     = false;
    let startTime   = 0;
    let endTime     = 0;

    this.start  = function() {
        if (started) throw new Error('Already started!');

        if (!startTime) startTime   = Date.now();
        started     = true;
    };

    this.stop   = function() {
        if (!started) throw new Error('Not started!');
        
        endTime = Date.now();
        started = false;
    };

    this.reset  = function() {
        startTime   = 0;
        endTime     = 0;
    };

    Object.defineProperty(this, 'duration', {
        get:    function() { return (endTime - startTime) / 1000 }
    })
};

const circle = {
    radius: 0,
    get area() {
        return Math.PI * (this.radius**2);
    }
};

circle.radius   = 10;

console.log(circle.area);

function sum(...args) {
    let total   = 0;
    for (let value of args) {
        if (Array.isArray(value)) total += sum(...value);
        else total += value;
    }

    return total;
}

console.log(sum([1,2,3,4,5], 10, 20, [5, 10]));

const movies = [
    { title: 'a', year: 2018, rating: 4.5 },
    { title: 'b', year: 2018, rating: 4.7 },
    { title: 'c', year: 2018, rating: 4.54 },
    { title: 'd', year: 2017, rating: 4.5 },
    { title: 'e', year: 2018, rating: 4.4 },
    { title: 'f', year: 2018, rating: 4.67 },
    { title: 'g', year: 2018, rating: 4.22 }
];

console.log(movies.filter(m => m.rating > 4 && m.year === 2018)
                        .sort((a,b) => a.rating - b.rating)
                        .reverse()
                        .map(m => m.title));

const myArray   = [1,2,3,334, 45,6];

console.log(getMax(myArray));

function getMax(array) {
    if (array.length === 0) return undefined;
    //return Math.max(...array);

    return array.reduce((accumulator, currentValue) => {
        if (currentValue > accumulator) return currentValue;
        return accumulator;
    });
}

const myArray   = [1,2,2,3,3,2,2,2,2,2,2,2];

console.log(countOcurrencies(myArray, 2));
console.log(anotherWayToCountOcurrencies(myArray, 2));

function countOcurrencies(array, element) {
    return array.filter(e => e === element).length;
}

function anotherWayToCountOcurrencies(array, element) {
    return array.reduce((accumulator, currentValue) => {
        if (currentValue === element) return ++accumulator;
        else return accumulator;
    }, 0);
}


const myArray   = [1,2,3,4,5,6];

console.log(move(myArray, 4, -3));
console.log(myArray);

function move(array, index, offset) {
    const position  = index + offset;

    if (position < 0 || position >= array.length)
        return console.error('Invalid offset.');

    const newArray  = [ ...array ];
    const item      = newArray.splice(index,1);
    newArray.splice(position,0,item[0]);

    return newArray;
}

const myArray   = [1,2,3,4,4,4,5,4,62,3546,2345,64,56,7,7,67];
const excludes  = [3, 4, 3456];

console.log(except(myArray, excludes));

function except(array, excluded) {
    return array.filter(v => !excluded.includes(v));
}

console.log(arrayFromRange(-2, 22));

function arrayFromRange(min, max) {
    const array = [];
    for (let i=min; i<=max; i++) array.push(i);
    return array;
}


function PriceRange() {
    this.min        = min;
    this.max        = max;
    this.decimals   = 2;
    this.currency   = 'USD';
    this.isInRange  = function (value) {
        return (value >= this.min && value <= this.max);
    }
}

function Post(title, body, author) {
    this.title      = title;
    this.body       = body;
    this.author     = author;
    this.views      = 0;
    this.comments   = [];
    this.isLive     = true;
    this.published  = false;
}

const myPost    = new Post('Great Post!', 'Lorem ipsum dolor sit amet.', 'Pablin');

console.log(myPost);

function createAddress(street, city, zipCode) {
    return { street, city, zipCode };
}

const myAddress = createAddress('Bentos', 'San Rafael', '5600');

console.log(myAddress);

function Address(street, city, zipCode) {
    this.street     = street;
    this.city       = city;
    this.zipCode    = zipCode;
}

const address1  = new Address('Bentos 2955', 'San Rafael, Mendoza', '5601');
const address2  = new Address('Bentos 2954', 'San Rafael, Mendoza', '5601');

console.log("Are equal?", areEqual(address1, address2));
console.log("Are the same?", areSame(address1, address1));

function areEqual(address1, address2) {
    for (let key in address1)
        if (address1[key] !== address2[key])
            return false;

    return true;
}

function areSame(obj1, obj2) {
    if (obj1 === obj2)
        return true;

    return false;
}


primeNumbers(1733);

function primeNumbers(limit) {
    for (let number=2; number<=limit; number++)
        if (isPrime(number)) console.log(number);
}

function isPrime(number) {
    for (let divider=2; divider<number; divider++)
        if (number % divider === 0)
            return false;
            
    return true;
}

showStars(50);

function showStars(count) {
    if (typeof count !== 'number') return 'Not a number';

    for (let i=1; i<=count; i++) console.log('*'.repeat(i));
}

const myMarks  = [ 74, 80, 34, 74, 96 ];
console.log('Your grade is', calculateGrade(myMarks));

function calculateGrade(array) {
    let average = 0;

    for (let mark of array) average += mark;
    average /= array.length;
    
    if (average < 60) return 'F';
    if (average < 70) return 'D';
    if (average < 80) return 'C';
    if (average < 90) return 'B';
    return 'A';
}


const truthies  = countTruthy([0, 1, 3, null, false, Date.now(), 4444, '']);
console.log(truthies);

function countTruthy(array) {
    let count = 0;

    for (value of array) if (value) count++;

    return count;
}


for (let i=0; i<100; i++) console.log(fizzBuzz(i));

console.log(fizzBuzz('puto'));


function fizzBuzz(input) {
    if (typeof input !== 'number') return 'Not a number';

    if (input % 15 === 0) return 'FizzBuzz';

    if (input % 5 === 0) return 'Buzz';
    
    if (input % 3 === 0) return 'Fizz';

    return input;
}


for (let i=50; i<= 180; i+=3) console.log(checkSpeed(i));

function checkSpeed(speed) {
    if (typeof speed !== 'number') return 'Invalid speed';

    const excess        = speed - 70;
    const kmPerPoint    = 5;
    const points        = Math.floor(excess/kmPerPoint);

    if (points <= 0) return 'Ok';
    if (points < 12 ) return `Speed exceeded: ${speed} - Points: ${points}`;
    return `Speed exceeded: ${speed} - License suspended.`;
}
*/