/*
// ------- //
//  Types  //
// ------- //

let a: number;
let b: string;
let c: boolean;
let d: any;
let e: number[] = [1, 2, 3];
// Not a good practice but is actually possible.
let f: any[] = [1, true, 'a', null];    // This should be avoided

// ----------------- //
//  Type assertions  //
// ----------------- //

let message;    // If nothing is assigned, the variable will be of type 'any'
message = 'Hello World';

// We need to tell the var type in order to get the proper intellisense.
let endsWithC       = (<string>message).endsWith('c');
let alternativeWay  = (message as string).endsWith('c');

// ------------ //
//  Interfaces  //
// ------------ //

// Interfaces are declared using Pascal naming convention.
interface Point {
    x: number,
    y: number
}

const drawPoint = (point: Point) => {
    // ....
};

drawPoint({
    //x: 'a' will cause an error. At the interface declaration, we specified that x is a number.
    x: 1,
    y: 1
});

// --------- //
//  Classes  //
// --------- //

import { Point } from './point';

let point   = new Point(1,2);
let x = point.x;
point.draw();
*/

import { LikeComponent } from './like.component';

const like  = new LikeComponent(1233, true);
console.log(`Likes: ${like.likeCount}, Active: ${like.isActive}`);
like.onClick();
console.log(`Likes: ${like.likeCount}, Active: ${like.isActive}`);
like.onClick();
console.log(`Likes: ${like.likeCount}, Active: ${like.isActive}`);

