![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png)

## Resources

  + [SourceMaking](https://sourcemaking.com/design_patterns) — good for analogies
  + [The Seven Most Important Design Patterns](https://medium.com/educative/the-7-most-important-software-design-patterns-d60e546afb0e)
  + Design Patterns on [GeeksforGeeks](https://www.geeksforgeeks.org/software-design-patterns/)

## Discussion Question Answers

1. What is an abstract class? Provide an example of an abstract class and several subclasses that might inherit from it.

A: An abstract class  is not meant to be invoked directly but rather to give functionality to the concrete classes that will inherit from it. An example might be a `Living Being` class from which all specific animals might inherit. 

2. Describe a behavioral pattern that influences how React code is written.

A: There are many answers, but unidirectional data flow is a good one that's mentioned in these lessons. Also worth mentioning are the immutability of props and the forcing of `setState` to modify state.

3. What is a Singleton and why might it be helpful?

A: A Singleton is a class that always points back to a single instance. It can keep data connections consistent so that we only have one through which we access a database or external server.

4. Throughout the program, our projects have gradually involved more and more files of smaller and smaller sizes. What would you call this concept and why would you implement it?

A: "Modularization," "separation of concerns," and "decoupling" are all good terms for this. It makes code more reusable, easier to work on in teams, and easier to test in isolation.
