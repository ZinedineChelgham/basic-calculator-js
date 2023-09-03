// Safe alternative to eval() function
function parse(str) {
  return Function(`'use strict'; return (${str})`)()
}

// An arithmetic operation
let operation = '456*21-48/5+73';

// Get the result
let result = parse( operation);

// Log the result
console.log( result); // Will display 9639.4

