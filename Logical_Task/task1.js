// ==================================
// TASK 1
// ==================================
// Description:-
//  - Generate object with key as character and value as number of character occurred in given string

// const a = "hello there";

// Output:-
// "h": 2
// "e": 3
// "l": 2
// "o": 1
// " ": 1
// "t": 1
// "r": 1


const s = "hello there";

var result = [...s].reduce((a, e) => { a[e] = a[e] ? a[e] + 1 : 1; return a }, {}); 
console.log(result);

