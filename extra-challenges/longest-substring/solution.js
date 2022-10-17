function longestUniqueSubstring(str) {
  if (str.length === 0) {
    return 0;
  }

  let prevIndex = 0;
  let visitedChars = {};

  // mark first character as visited by storing index in visitedChars
  // currentLength and maxLength are initialized to 1
  visitedChars[str[0]] = 0;
  let currentLength = 1;
  let maxLength = 1;

  // start from second character
  for (let i = 1; i < str.length; i++) {
    // set prevIndex to -1 if character hasn't been seen yet
    prevIndex = typeof visitedChars[str[i]] === 'undefined' ? -1 : visitedChars[str[i]];

    // if the character is not present in the already processed substring or it is not part
    // of the current non repeating char string, then increment currentLength
    if (prevIndex === -1 || i - currentLength > prevIndex) {
      currentLength++;

      // if the current character is present in the current NRCS, then we update NRCS to start
      // from the next character of the previous instance
    } else {
      //
      if (currentLength > maxLength) {
        maxLength = currentLength;
      }

      currentLength = i - prevIndex;
    }
    // update index of current character in visited hash table
    visitedChars[str[i]] = i;
  }

  if (currentLength > maxLength) {
    maxLength = currentLength;
  }

  return maxLength;
}

let str = 'abababcdefababcdab';

console.log('Input string: ' + str);
console.log('Longest NRCS: ' + longestUniqueSubstring(str));

str = 'abababcdefababcdabghjkloiuyt';

console.log('Input string: ' + str);
console.log('Longest NRCS: ' + longestUniqueSubstring(str));

str = 'asdjfurewopqlzxnmabababcdefababcdab';

console.log('Input string: ' + str);
console.log('Longest NRCS: ' + longestUniqueSubstring(str));
