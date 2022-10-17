# Order Check

You are given 3 arrays that contain either strings or numbers. The values across `list1` and `list2` are all unique. For example, if `list1` contains the name `'Bob'`, `'Bob'` will not appear again in `list1` or in `list2`. The third list, `combinedList`, contains all the values from `list1` and `list2`, so the length of `combinedList` is the length of `list1` plus the length of `list2`. We want to know if the order of `list1` items is the same in `list1` and the `combinedList`, and the order of `list2` items is the same in `list2` and the `combinedList`.

Write a function that returns `true` if the order of `list1` and `list2` is preserved in the `combinedList`, or returns `false` otherwise.

So for example, given inputs:
```javascript
const list1 = [2, 5, 7, 9, 1]
const list2 = [3, 4, 8, 6, 10, 11]
const combinedList = [2, 5, 3, 7, 4, 8, 10, 9, 1, 6, 11]
```
your function would return `false` because `6` comes before `10` in `list2`, but `10` comes before `6` in `combinedList`.

However, given inputs:
```javascript
const list1 = ['Jack', 'Julie', 'Jill', 'Jeff']
const list2 = ['Bob', 'Joe', 'Kim']
const combinedList = ['Bob', 'Joe', 'Jack', 'Julie', 'Jill', 'Kim', 'Jeff']
```
your function would return `true` because the order is preserved for both lists.

We can do this in `O(n)` time and `O(1)` additional space. Also, do not mutate the original lists.
