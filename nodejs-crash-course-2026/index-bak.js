
const name = 'Avinash';

const greet = () => {
  console.log(`Hello, ${name}!`);
};

greet();

// console.log(global);
// console.log(process);

// const { generateRandomNumber, celciusToFahrenheit } = require('./utils');
import { generateRandomNumber, celciusToFahrenheit } from './utils.js';

const randomNum = generateRandomNumber();
console.log(`Generated Random Number: ${randomNum}`);
const fahrenheit = celciusToFahrenheit(randomNum);
console.log(`${randomNum}°C in Fahrenheit is: ${fahrenheit}°F`);

