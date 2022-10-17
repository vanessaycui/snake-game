/**
 * 2nd attempt - Recursive, but use pointers instead of slicing
 * O(n) time
 * O(n) space (call stack)
 */

function checkOrder(list1, list2, combinedList, combinedIndex = 0, list1Index = 0, list2Index = 0) {
  // base case we've hit the end of combinedList
  if (combinedIndex === combinedList.length) {
    return true;
  }

  if (list1Index < list1.length && list1[list1Index] === combinedList[combinedIndex]) {
    list1Index++;
  } else if (list2Index < list2.length && list2[list2Index] === combinedList[combinedIndex]) {
    list2Index++;
  } else {
    return false;
  }

  // the current item in combinedList has now been "accounted for"
  // so move on to the next one
  combinedIndex++;
  return checkOrder(list1, list2, combinedList, combinedIndex, list1Index, list2Index);
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
