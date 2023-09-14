// ==================================
// TASK 3
// ==================================
// A palindrome is a word, phrase, number, or other sequence of characters which reads the same backward or forward.
// Implement a function called getIsPalindrome() that should return true if the input string is a palindrome. 

// Output:-
// 'kayak' => true
// 'mango' => false
// 'bob'   => true


function getIsPalindrome(str) {
    var re = /[\W_]/g;
    var lowRegStr = str.toLowerCase().replace(re, '');
    var reverseStr = lowRegStr.split('').reverse().join(''); 
    return reverseStr === lowRegStr;
  }
  
  console.log(getIsPalindrome("keertan"));