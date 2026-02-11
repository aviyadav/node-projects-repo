const fetchdata = (callback) => {
    setTimeout(() => {
        callback('Done!');
    }, 1500);
};


// console.log('begin');

setTimeout(() => {
    console.log('timer is done');
    fetchdata((text) => {
        console.log(text);
    });
}, 2000);

console.log('Test1');
console.log('Test101');
