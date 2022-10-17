// Solution using an Object

// Keep track of pairs of characters.
// If there is one or less characters that appear an odd number
// of times, the string has a palindrome permutation

function hasPalindromePermutationOne(str) {
  const unpairedChars = {};

  for (let char of str) {
    if (unpairedChars[char]) {
      delete unpairedChars[char];
    } else {
      unpairedChars[char] = 1;
    }
  }

  return Object.keys(unpairedChars).length <= 1;
}

console.log(hasPalindromePermutationOne('level') === true);
console.log(hasPalindromePermutationOne('evlel') === true);
console.log(hasPalindromePermutationOne('levec') === false);
console.log(hasPalindromePermutationOne('evcel') === false);

// Better solution using a Set
function hasPalindromePermutationTwo(str) {
  const unpairedChars = new Set();

  for (let char of str) {
    if (unpairedChars.has(char)) {
      unpairedChars.delete(char);
    } else {
      unpairedChars.add(char);
    }
  }

  return unpairedChars.size <= 1;
}

console.log(hasPalindromePermutationTwo('level') === true);
console.log(hasPalindromePermutationTwo('evlel') === true);
console.log(hasPalindromePermutationTwo('levec') === false);
console.log(hasPalindromePermutationTwo('evcel') === false);
