# Max Number of Elements Divisible by 3

Given an array of integers, find the maximum possible number of elements divisible by 3 that are in the resulting array after performing an addition operation zero or more times. In each operation, we can add **any** two elements of the array.

Examples:
```javascript
let list = [1, 2, 3, 2]
// outputs: 2
```
We can add elements `1` and `2`, so the array becomes `[3, 3, 2]`, so the max possible elements divisible by 3 is **2**

```javascript
let list2 = [1, 1, 1, 1, 4, 2, 2]
// outputs: 3
```
We can add elements to make `[3, 3, 6]`, **3** elements divisible by 3

```javascript
let list3 = [9, 10, 1, 1, 3, 2, 2]
// outputs: 4
```
We can add elements to make `[9, 12, 1, 3, 3]`, **4** elements divisible by 3