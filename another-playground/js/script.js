// let i = 11;
// i = i++ + ++i;

// console.log(i);

// let a = 10;
// let b = 20;
// let c = a + b + a++ + b++ + ++a + ++b;
// console.log(c); // 93

// function AddNumber(num) {
//   let sum = 0;
//   while (num > 0) {
//     sum = sum + (num % 10);
//     num = Math.floor(num / 10);
//   }
//   return sum;
// }
// console.log(AddNumber(4512));

// function ReverseNumber(num) {
//   let rev = 0;

//   while (num > 0) {
//     let digit = num % 10;
//     rev = rev * 10 + digit;
//     num = Math.floor(num / 10);
//   }
//   return rev;
// }

// console.log(ReverseNumber(789456123));

// function SumOfDigit(num) {
//   let sum = 0;

//   while (num > 0) {
//     let digit = num % 10;
//     sum = sum + digit;
//   }
// }

// console.log(SumOfDigit(1234));

// function AddNumber(num) {
//   let sum = 0;
//   while (num > 0) {
//     sum = sum + (num % 10);
//     num = Math.floor(num / 10);
//   }
//   return sum;
// }
// console.log(AddNumber(95115995159987456325414));
function NumberCount(num) {
  let count = 0;
  while (num > 0) {
    count++;
    num = Math.floor(num / 10);
  }
  return count;
}

console.log(NumberCount(45654578956541236587489562365412587485698558));
