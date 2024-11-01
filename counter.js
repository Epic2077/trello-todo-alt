// function cacheFunction(fn) {
//   const cache = {};

//   return function (input) {
//     if (cache[input] !== undefined) {
//       console.log("Returning cached result");
//       return cache[input];
//     }

//     console.log("Calculating new result");
//     const result = fn(input);
//     cache[input] = result;
//     return result;
//   };
// }

// const slowCalculation = (num) => {
//   for (let i = 0; i < 1e8; i++) {}
//   return num * 2;
// };
// function slowCalculation2(num) {
//   for (let i = 0; i < 2000; i++) {}
//   return num + 10;
// }

// const cachedCalculation = cacheFunction(slowCalculation);

// const cashedCalculation2 = cacheFunction(slowCalculation2);

// console.log(cachedCalculation2(8));
// console.log(cachedCalculation(5));
// console.log(cachedCalculation(5));

console.log(a2);
const a2 = 2;
