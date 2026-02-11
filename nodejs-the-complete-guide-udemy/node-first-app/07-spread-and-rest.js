const person = {
    name: 'Max',
    age: 29,
    greet() {
      console.log('Hi, I am ' + this.name);
    }
};

// console.log(person);

const hobbies = ['Sports', 'Cooking'];

// const copiedArray = hobbies.slice();
// const copiedArray = [hobbies];

const copiedArray = [...hobbies];
console.log(copiedArray);

const copiedPerson = {...person};
// console.log(copiedPerson);


// const toArray = (arg1, arg2, arg3) => {
//     return [arg1, arg2, arg3];
// };

const toArray = (...args) => {
    return args;
}


console.log(toArray(1,4,7,11)); // displaye 3 args only
