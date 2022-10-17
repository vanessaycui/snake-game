// Using for loop and multiple if else blocks
function mergeArrays(a1, a2) {
  const merged = [];
  let index1 = 0;
  let index2 = 0;

  for (let i = 0; i < a1.length + a2.length; i++) {
    if (index1 >= a1.length) {
      merged.push(a2[index2]);
      index2++;
    } else if (index2 >= a2.length) {
      merged.push(a1[index1]);
      index1++;
    } else if (a1[index1] <= a2[index2]) {
      merged.push(a1[index1]);
      index1++;
    } else {
      merged.push(a2[index2]);
      index2++;
    }
  }

  return merged;
}

// using while loop and one if else block
function mergeArrays(a1, a2) {
  const merged = [];

  let index1 = 0;
  let index2 = 0;
  let mergedIndex = 0;

  while (mergedIndex < a1.length + a2.length) {
    if (index1 < a1.length && (index2 >= a2.length || a1[index1] < a2[index2])) {
      merged[mergedIndex] = a1[index1];
      index1++;
    } else {
      mergedArray[mergedIndex] = a2[index2];
      index2++;
    }

    mergedIndex++;
  }

  return merged;
}
