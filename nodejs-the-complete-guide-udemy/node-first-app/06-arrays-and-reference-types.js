const person = {
    name: 'Max',
    age: 30,
    greet() {
        console.log('Hi, I am ' + this.name);
    }
};

const hobbies = ['Sports', 'Cooking'];

hobbies.push('Programming');

console.log(hobbies);
