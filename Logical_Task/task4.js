// ==================================
// TASK 4
// ==================================
// Description:-
//  - Generate string equation from given array
//    
// const a = [
//   "OR",
//   ["<", "a", "b"],
//   ["AND", ["==", "c", "d"], ["!=", "e", "f"]]
// ];

// Output:-
// a < b OR (c == d AND e != f)

function generateStringEquation(arr) {
  if (!Array.isArray(arr)) {
    return arr;
  }

  const operator = arr[0];
  const operands = arr.slice(1);

  if (operator === "OR" || operator === "AND") {
    const joinedOperands = operands.map(generateStringEquation).join(` ${operator} `);
    return `(${joinedOperands})`;
  } else {
    return `${operands[0]} ${operator} ${operands[1]}`;
  }
}

const a = [
  "OR",
  ["<", "a", "b"],
  ["AND", ["==", "c", "d"], ["!=", "e", "f"]]
];

const stringEquation = generateStringEquation(a);
console.log(stringEquation);


