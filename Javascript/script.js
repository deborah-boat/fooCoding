//string

let myString = 'hello,this,is,a,difficult,to,read,sentence';
console.log(myString);
myString = myString.replace(/,/g, '');
console.log(myString);

//Arrays
let favoriteAnimals = [ 'blowfish', 'capricorn', 'giraffe' ];
favoriteAnimals.push('turtle'); //end
console.log(favoriteAnimals);

favoriteAnimals.splice(0, 1, 'meerkat'); //middle
console.log(favoriteAnimals);
console.log("the new value of the array is:'blowfish','meerket','capricorn','giraffe','turtle'");
console.log(favoriteAnimals);
console.log(favoriteAnimals.length);
console.log('the array has a length of : 4');
favoriteAnimals.splice(3, 1); //delate
console.log(favoriteAnimals);
favoriteAnimals.indexOf('meerkat', 0);
console.log('the item you are looking for is at index: ' + 'meerkat', 0);

//More Javascript
//function with 3 argument
function sum(a, b, c) {
	return a + b + c;
}
sum(20, 20, 20);

//colorFunction
function colorCar(color) {
	console.log(`a ${color} car`);
}
colorCar('red');

//object
const person = {
	firstName: 'Debby',
	age: 20
};
function printOut(object) {
	for (let key in person) console.log(key, person[key]);
}

//vehicleType
function vehicleType(color, code) {
	if (code === 1) {
		console.log('a' + color + '' + 'car');
	} else code === 2;
	console.log(`a ${color}motorbike`);
}
vehicleType('blue', 2);
vehicleType('blue', 1);

//simple layout
3 === 3;
console.log('yes' || 'no');

// vehicle function

function vehicle(color, code, age) {
	if (code === 1 && age > 1) {
		return console.log('a' + color + '' + 'used' + 'car');
	}
}
vehicle('blue', 1, 5);

let vehicles = [ 'motorbike', 'caravan', 'bike', 'volvo', 'matrix' ];
console.log(vehicle[2]); //how to get third element

function printAdvertisement(arr) {
	let advertisment = "Amazing Joe's Garage, we service ";
	for (let i = 0; i < arr.length - 1; i++) advertisement = `${arr[i]}s, `;
}

let colors = {};
let fooCoding = {
	teachers: [ 'Tommy', 'Bara' ],
	languages: [ 'HTML-CSS', 'Javascript' ]
};

//equality arrays
let x = [ 1, 2, 3 ];
let y = [ 1, 2, 3 ];
let z = y;
console.log(x == y, x === y, z == y, z == x);

//final code
let o1 = { foo: 'bar' };
let o2 = { foo: 'bar' };
let o3 = o2;

o2.foo = 'coding';
console.log(o3);
console.log(`o3 has changed on ${JSON.stringify(o3)}`);

o1.foo = 'Malmö';
console.log(o3);
console.log(`o3 hasn't changed.`);

//17 What typeOf returns
let bar = 42;
typeof typeof bar;

console.log(` typeof typeof bar returns string because first typeof return "number" and second typeof return string`);
