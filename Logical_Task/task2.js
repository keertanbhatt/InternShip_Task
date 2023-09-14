// ==================================
// TASK 2
// ==================================
// Description:-
//  - get single array form array of array
//  
// const a = [1, [2,3],[[4,5], 7],6]

// Output:-
// [1,2,3,4,5,7,6]


arr = [1,2,[3,4,5],[6,7,8,9],10] 
let flattened_array = [].concat.apply([], arr);
console.log("Flattened Array: ", flattened_array)
