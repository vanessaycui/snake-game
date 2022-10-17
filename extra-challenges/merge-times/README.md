# Merge Time Ranges

You are given an array of objects with a start and end times. These times are represented as small integers, but could also be represented as a large integer, like a UNIX timestamp.

For example:
```javascript
{ start: 1, end: 5 }
{ start: 0, end: 6 }
{ start: 1575386006019, end: 1575386024000 }
```

Write a function that takes an array of multiple time ranges, merges those time ranges and returns an array of condensed time ranges.

For example, given:

```javascript
let events = [
    { start: 0, end: 1 },
    { start: 3, end: 6 },
    { start: 4, end: 5 },
    { start: 5, end: 7 },
    { start: 11, end: 14 },
    { start: 8, end: 11 }
]
```

your function would return:
```javascript
[
    { start: 0, end: 1 },
    { start: 3, end: 7 },
    { start: 8, end: 14 }
]
```

We can NOT assume that the time ranges are given in order. In this previous case, the end time of 11 and start time of 11 are merged, but the end time of 7 and start time of 8 are not merged.

