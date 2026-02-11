const name = 'Max';
let age = 29;
const hasHobbies = true;

age = 30;

// function summarizeUser(userName, userAge, userHasHobbies) {
//     return (
//         'Name is ' +
//         userName +
//         ', age is ' +
//         userAge +
//         ' and the user has hobbies: ' +
//         hasHobbies
//     );
// }

// console.log(summarizeUser(name, age, hasHobbies));


// const summarizeUser = function (userName, userAge, userHasHobbies) {
//     return (
//         'Name is ' +
//         userName +
//         ', age is ' +
//         userAge +
//         ' and the user has hobbies: ' +
//         hasHobbies
//     );
// };

// console.log(summarizeUser(name, age, hasHobbies));


const summarizeUser = (userName, userAge, userHasHobbies) => {
    return (
        'Name is ' +
        userName +
        ', age is ' +
        userAge +
        ' and the user has hobbies: ' +
        hasHobbies
    );
};


// console.log(summarizeUser(name, age, hasHobbies));


// const add = (a, b) => {
//     return a + b;
// };


// console.log(add(21, 36));


const add = (a, b) => a + b;


// console.log(add(24, 12));

// const addPi = (a) => a + 3.14;
const addPi = a => a + 3.14;
// console.log(addPi(31));

const addRandom = () => 1 +3.1415172;
console.log(addRandom());