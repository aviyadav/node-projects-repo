const person = {
    name: 'Max',
    age: 30,
    greet() {
        console.log('Hi, I am ' + this.name);
    }
};

const hobbies = ['Sports', 'Cooking'];

console.log(hobbies)

// for (let hobby of hobbies) {
//     console.log(hobby);
// }

console.log(hobbies.map(hobby => 'Hobby: ' + hobby));


