function mergeRanges(times) {
  // Create a deep copy of the times array
  // What can't we just use concat?
  const timesCopy = JSON.parse(JSON.stringify(times));

  // Sort by start time (timesCopy gets sorted in place, but we make a new reference to it)
  // Note: using built in sort and assuming O(n * logn) for time complexity
  const sortedTimes = timesCopy.sort((a, b) => {
    return a.start - b.start;
  });

  // Make a new mergedTimes array, first element can be the first time in sortedTimes
  const mergedTimes = [sortedTimes[0]];

  for (let i = 1; i < sortedTimes.length; i++) {
    const current = sortedTimes[i];
    const lastMerged = mergedTimes[mergedTimes.length - 1];

    // If the current time range overlaps with the last merged time range, use the
    // later end time of the two
    if (current.start <= lastMerged.end) {
      lastMerged.end = Math.max(lastMerged.end, current.end);
    } else {
      // Add the current meeting since it doesn't overlap
      mergedTimes.push(current);
    }
  }

  return mergedTimes;
}

// driver code

let events = [
  { start: 0, end: 1 },
  { start: 3, end: 6 },
  { start: 4, end: 5 },
  { start: 5, end: 7 },
  { start: 8, end: 11 }
  { start: 11, end: 14 },
];

console.log(mergeRanges(events));
