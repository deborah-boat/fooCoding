//Program that checks the types of two variable and print out SAME TYPE if they are same
let string = 'I am fine';
let num = 19;
let bool = true;
let array = [ 'name', 'age', 'color' ];

console.log(string);
console.log(num);
console.log(bool);
console.log(array);

console.log('the type of the variable is:' + string);
console.log('the type of the variable is:' + num);
console.log('the type of the variable is:' + bool);
console.log('the type of the variable is:' + array);

console.log(typeof string);
console.log(typeof num);
console.log(typeof bool);
console.log(typeof array);

if (
	typeof string == typeof array ||
	typeof num == typeof bool ||
	typeof bool == typeof array ||
	typeof array == typeof num ||
	typeof num == typeof bool ||
	typeof str == typeof array
) {
	console.log('Same type');
} else {
	console.log('Different type');
}
