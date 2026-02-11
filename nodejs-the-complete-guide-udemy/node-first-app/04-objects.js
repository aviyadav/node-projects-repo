const person = {
    name: 'Max',
    age: 39,
    // greet: () => {   // name is undefined
    // greet: function() {
    greet() {
        console.log('Hi, I am ' + this.name);
      }
};

// console.log(person);
person.greet();