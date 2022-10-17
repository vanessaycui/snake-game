function insertionSort (items) {
  // Loop through each element
  for(var i = 0; i < items.length; i++) {
    // store the current item value so it can be placed correctly
    // in the sorted portion of the array
    var value = items[i];

    // Loop backward through the sorted portion of the array
    // and scoot everything over until you find the right place to
    // insert the value you're working with
    for (var j = i - 1; j > -1 && items[j] > value; j--) {
      // Copy each item to the next slot over, as long as the value is smaller
      // than the item in the sorted array we're looking at (items[j] > value)
      items[j + 1] = items[j];
    }

    // We can now insert the item in its sorted location
    items[j + 1] = value;
  }

  // Remember to return the list!
  return items;
}

// Sample data for testing out our insertion sort
var list = [14, 94, 33, 11, 77, 12, 4, 66, 23, 50, 12, 42, 89, 70, 35];
console.log(insertionSort(list));

// For the code! Credit to https://hackernoon.com/programming-with-js-insertion-sort-1316df8354f5

