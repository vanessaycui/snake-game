# Class Message

You have a class full of students, and you want to devise an efficient way for students to pass messages to each other using the fewest number of people as possible (you don't want to get caught passing the message!). Each student is within reach of other students that are nearby, and those are the only students that the can pass the message to.

Given information about all the students in the class, and who they are sitting adjacent to, find the shortest route to pass a message from one student (the sender) to another (the recipient). Return the array of students that make up the shortest route the message will take.

An example seating chart might look like this, where the students are a graph represented as an adjacency list.

```js
const class = {
  'Min'     : ['William', 'Jayden', 'Omar'],
  'William' : ['Min', 'Noam'],
  'Jayden'  : ['Min', 'Amelia', 'Ren', 'Noam'],
  'Ren'     : ['Jayden', 'Omar'],
  'Amelia'  : ['Jayden', 'Adam', 'Miguel'],
  'Adam'    : ['Amelia', 'Miguel', 'Sofia', 'Lucas'],
  'Miguel'  : ['Amelia', 'Adam', 'Liam', 'Nathan'],
  'Noam'    : ['Nathan', 'Jayden', 'William'],
  'Omar'    : ['Ren', 'Min', 'Scott'],
  ...
}
```

A message from Jayden to Adam using this class arrangement should have this route `['Jayden', 'Amelia', 'Adam']`
