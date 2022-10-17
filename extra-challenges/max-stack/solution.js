class Stack {
  constructor() {
    // Initialize an empty stack
    this.items = [];
  }

  // Push a new item onto the stack
  push(item) {
    this.items.push(item);
  }

  // Remove and return the last item
  pop() {
    // If the stack is empty, return null
    // (It would also be reasonable to throw an exception)
    if (!this.items.length) {
      return null;
    }
    return this.items.pop();
  }

  // Returns the last item without removing it
  peek() {
    if (!this.items.length) {
      return null;
    }
    return this.items[this.items.length - 1];
  }
}

// attempt 1
/** 
class MaxStack {
  constructor() {
    this.stack = new Stack();
    this.max = null;
  }

  push(item) {
    this.stack.push(item);
    if (this.max === null || item > this.max) {
      this.max = item;
    }
  }

  // Will not be O(1) if we are popping the max element
  pop() {
    let item = this.stack.pop();
    if (this.stack.peek() === null) {
      this.max = null;
      return item;
    }

    if (item === this.max) {
      this.max = this.stack.peek();
      // this.stack.items.forEach(el => {
      //   if (el > this.max) {
      //     this.max = el
      //   }
      // })
      let tempStack = new Stack();
      while (this.stack.peek() !== null) {
        let el = this.stack.pop();
        if (el > this.max) {
          this.max = el;
        }
        tempStack.push(el);
      }

      while (tempStack.peek() !== null) {
        this.stack.push(tempStack.pop());
      }
    }

    return item;
  }

  getMax() {
    return this.max;
  }
}
*/

// 2nd solution uses second stack to track maxes

/**
class MaxStack {
  constructor() {
    this.stack = new Stack();
    this.maxesStack = new Stack();
  }

  push(item) {
    this.stack.push(item);
    if (this.maxesStack.peek() === null || item >= this.maxesStack.peek()) {
      this.maxesStack.push(item);
    }
  }

  pop() {
    let item = this.stack.pop();
    if (item === this.maxesStack.peek()) {
      this.maxesStack.pop();
    }
    return item;
  }

  getMax() {
    return this.maxesStack.peek();
  }
}
*/

// 3rd solution uses no extra space, but doesn't hold item values in stack. Item values can be retrieved though

class MaxStack {
  constructor() {
    this.stack = new Stack();
    this.max = null;
  }

  push(item) {
    if (this.stack.peek() === null) {
      this.stack.push(item);
      this.max = item;
    } else if (item > this.max) {
      let tmp = 2 * item - this.max;
      this.stack.push(tmp);
      this.max = item;
    } else {
      this.stack.push(item);
    }
  }

  pop() {
    let item = this.stack.pop();
    if (item > this.max) {
      let tmpMax = this.max;
      this.max = 2 * this.max - item;
      return tmpMax;
    }
    return item;
  }

  getMax() {
    return this.max;
  }
}

// driver code

let maxStack = new MaxStack();

maxStack.push(13);
maxStack.push(12);
maxStack.push(10);
maxStack.push(14);
maxStack.push(15);
maxStack.push(15);
maxStack.push(9);
maxStack.push(4);

// console.log(maxStack.stack.items);
console.log(maxStack.getMax(), 'should be 15');

console.log(maxStack.pop());
console.log(maxStack.pop());

console.log(maxStack.pop());

console.log(maxStack.getMax(), 'should be 15');

console.log(maxStack.pop());

console.log(maxStack.getMax(), 'should be 14');

console.log(maxStack.pop());

console.log(maxStack.getMax(), 'should be 13');
