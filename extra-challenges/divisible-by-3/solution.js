function maxNumberOfElements(a) {
  const frequency = [0, 0, 0];
  let answer = 0;

  a.forEach((num) => {
    const mod = num % 3;
    frequency[mod] += 1;
  });

  // taking all values evenly divisable by 3, adding them to our final answer
  answer = frequency[0];

  // if our frequency looks something like this [2, 3, 4]
  // 2 - divide perfectly into 3
  // 3 - have a remainder of 1
  // 4 - have a remainder of 2
  // we can make 3 values with (2 + 1) which leaves one value that has a remainder of 2

  // answer now becomes 2 + 3 = 5
  let min = Math.min(frequency[1], frequency[2]);
  answer += min;
  frequency[1] -= min;
  frequency[2] -= min;
  answer += Math.floor(frequency[1] / 3) + Math.floor(frequency[2] / 3);

  return answer;
}

// driver code
const a = [1, 4, 10, 7, 11, 2, 8, 5, 9]; // remainders: [1, 1, 1, 1, 2, 2, 2, 2, 0] which gives frequency: [1, 4, 4] answer: 5
const list3 = [9, 10, 1, 1, 3, 2, 2];
const list2 = [1, 1, 1, 1, 4, 2, 2];
const list = [1, 2, 3, 2];

console.log(maxNumberOfElements(a));
console.log(maxNumberOfElements(list3));
console.log(maxNumberOfElements(list2));
console.log(maxNumberOfElements(list));
