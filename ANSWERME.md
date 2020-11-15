1. In the project there was a house that did not have a lord. Which house was this? And what did you do to deal with this situation?


I created a function getMember() whitch grabs a random member from the house crew and if house
doesnt have a leader, it puts there one of the swords.


2. You could have used XMLHttpRequest, the library axios or the fetch API to get the data from the server. And you could have used callbacks, async/await and/or promises. What did you use and why?
(_TIP: There is no right way, all have their advantages and disadvantages. Explain your decision making listing the advantages/disadvantages of each technology/approach_)


I used 'fetch' because it is built into browser (doesnt need to be imported) and it's easy to use.


3. Let's say you were a huge fan of Object Oriented Programming and the api offered the option to get all the data you needed at once. What classes would you make and what functions would they have?
(_TIP: You do not have to write out the implementation of the functions (but you can if it makes it easier to think it through)_)
(_TIP: If you are unsure between two decisions, then write a comment with the alternative you considered but decided against with arguments. There is again no one correct answer here, but we want to see you think in an OOP way_)
(_TIP: If you want the code highlighting, it is also fine to create a `.js` file and then write down here what file to look at_)

I am a great fan of OOP (really!), and first of all I would use TypeScript for that.
If I had a half an hour more I would describe that objects with great pleasure.

Example (taken from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
```
class Rectangle {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }

  get area() {
    // get the area of the rectangle
  }

  calcArea() {
    // calculate the area of the rectangle
  }
}
```