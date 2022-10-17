/**
 * 1st Attempt - Recursive, remove items from arrays
 * O(n^2) time
 * O(n^2) space
 */

function checkOrder(list1, list2, combinedList) {
  // base case, done checking combinedList
  if (combinedList.length === 0) {
    return true;
  }

  if (list1.length && list1[0] === combinedList[0]) {
    // take the first item off list1 and combinedList and recurse
    return checkOrder(list1.slice(1), list2, combinedList.slice(1));
  } else if (list2.length && list2[0] === combinedList[0]) {
    // take the first item off list2 and combinedList and recurse
    return checkOrder(list1, list2.slice(1), combinedList.slice(1));
  } else {
    return false;
  }
}

// driver code

let list1 = [2, 5, 7, 9, 1];
let list2 = [3, 4, 8, 6, 10, 11];
let combinedList = [2, 5, 3, 7, 4, 8, 10, 9, 1, 6, 11];

console.log(checkOrder(list1, list2, combinedList) === false);

list1 = ['Jack', 'Julie', 'Jill', 'Jeff'];
list2 = ['Bob', 'Joe', 'Kim'];
combinedList = ['Bob', 'Joe', 'Jack', 'Julie', 'Jill', 'Kim', 'Jeff'];

// should be true
console.log(checkOrder(list1, list2, combinedList) === true);
