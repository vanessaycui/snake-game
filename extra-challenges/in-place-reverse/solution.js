// Since we can not create a new array, we need to start at either
// end of the array, and swap characters in place

function reverseCharacters(charArray) {
  let leftIndex = 0;
  let rightIndex = charArray.length - 1;

  while (leftIndex < rightIndex) {
    // Swap characters
    const temp = charArray[leftIndex];
    charArray[leftIndex] = charArray[rightIndex];
    charArray[rightIndex] = temp;

    // Move towards middle
    leftIndex++;
    rightIndex--;
  }
}

let arr = ['a', 'b', 'c', 'a', 'd'];

console.log('Before reverse: ' + arr);
reverseCharacters(arr);
console.log('After reverse: ' + arr);
