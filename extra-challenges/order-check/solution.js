/**
 * Iterative solution
 * O(n) time
 * O(1) space
 */

function checkOrder(list1, list2, combinedList) {
  let list1Index = 0;
  let list2Index = 0;
  const list1MaxIndex = list1.length - 1;
  const list2MaxIndex = list2.length - 1;

  for (let i = 0; i < combinedList.length; i++) {
    const item = combinedList[i];

    if (list1Index <= list1MaxIndex && item === list1[list1Index]) {
      list1Index++;
    } else if (list2Index <= list2MaxIndex && item === list2[list2Index]) {
      list2Index++;
    } else {
      return false;
    }
  }

  // all items are accounted for, order is preserved
  return true;
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
