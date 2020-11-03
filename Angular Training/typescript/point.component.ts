export class Point {
    // Access modifiers can be used to set the behaviour of the properties.
    // Or it can be added in the constructor as it's shown below.
    //private x: number;
    //private y: number;

    // Adding a question mark after the variable name will set it as optional
    // All other varialbes declared after (at the righ side) of the first optional one
    // should also be marked as optional.
    constructor(private _x?: number, private _y?: number) {
        // By setting the access modifier as a constructor parameter, the lines below
        // are not necessary.
        //this.x  = x;
        //this.y  = y;
    }

    draw() {
        console.log(`X: ${this._x}, Y: ${this._y}`);
    }

    get x() {
        return this._x;
    }

    set x(value) {
        if (value < 0) throw new Error('Value must not be less than 0.');
        this._x = value;
    }
}