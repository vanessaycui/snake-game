// Write code inside the functions
// You will have to figure out what parameters to include
// All functions must use recursion

// assumes array has at least one element
function findMax(arr, index = 1, max) {
  // if there's no max yet, set it to the first element
  console.log('index: ' + index + ' max: ' + max);

  if (typeof max === 'undefined' && arr.length) {
    max = arr[0];
  }
  // the base case is when all indices have been searched
  if (index === arr.length) {
    return max;
  }
  if (arr[index] > max) {
    max = arr[index];
  }
  return findMax(arr, index + 1, max);
}

// console.log(findMax([1, 3, 7, 34, 23, 24]));

function factorial(num) {
  if (num === 1) {
    return 1;
  } else {
    return num * factorial(num - 1);
  }
}

function fibonacci(num) {
  if (num <= 0) return 0;
  if (num <= 2) {
    return 1;
  }
  return fibonacci(num - 1) + fibonacci(num - 2);
}

function coinFlips(num) {
  const results = [];
  function rCoinFlips(stem = '') {
    // console.log(stem);

    if (stem.length === num) {
      results.push(stem);
    } else {
      rCoinFlips(stem + 'H');
      rCoinFlips(stem + 'T');
    }
  }
  rCoinFlips();
  return results;
}

// console.log(coinFlips(4));

// Without the ordering...
// function letterCombinations(arr) {
//   const results = [];
//   function rLetterCombinations(stem, remainder) {
//     console.log(stem, remainder);

//     if (stem.length === arr.length) {
//       results.push(stem);
//       return;
//     }
//     if (stem.length > 0) {
//       results.push(stem);
//     }
//     for (let i = 0; i < remainder.length; i++) {
//       const newRemainder = remainder.slice(0, i).concat(remainder.slice(i + 1));
//       rLetterCombinations(stem + remainder[i], newRemainder);
//     }
//   }
//   rLetterCombinations('', arr);
//   return results;
// }

// Maintains the order that the initial question asked
function letterCombinations(arr) {
  const results = [];
  for (let i = 0; i < arr.length; i++) {
    results.push([]);
  }

  function rLetterCombinations(stem, remainder) {
    if (stem.length === arr.length) {
      results[stem.length - 1].push(stem);
      return;
    }
    if (stem.length > 0) {
      results[stem.length - 1].push(stem);
    }

    for (let i = 0; i < remainder.length; i++) {
      const newRemainder = remainder.slice(0, i).concat(remainder.slice(i + 1));
      rLetterCombinations(stem + remainder[i], newRemainder);
    }
  }

  rLetterCombinations('', arr);
  // console.log(results);
  return results.reduce((acc, curr) => acc.concat(curr), []);
}

console.log(letterCombinations(['a', 'b', 'c']));

module.exports = {
  findMax,
  factorial,
  fibonacci,
  coinFlips,
  letterCombinations,
};
