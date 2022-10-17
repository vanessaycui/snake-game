function bubbleSort(array) {
  do {
    // reset swapHappened to false each time so we can detect if a swap
    // happened in this specific iteration.
    var swapHappened = false;

    for (var i = 0; i < array.length - 1; i++) {
      // compare each pair of elements near each other
      if (array[i] > array[i + 1]) {
        // swap them if the bigger one was at a lower index.
        var temp = array[i];
        array[i] = array[i + 1];
        array[i + 1] = temp;

        // keep track of whether a swap happened.
        swapHappened = true;
      }
    }
  } while (swapHappened)
  return array;
}


console.log("Sorting [1,2,4,5,6,8,5]: ", bubbleSort([1,2,4,5,6,8,5])) // duplicates don't matter!

console.log("Sorting [1,2,1,4,1,5,6,8,2,1,5]: ",  bubbleSort([1,2,1,4,1,5,6,8,2,1,5])) // duplicates don't matter!
