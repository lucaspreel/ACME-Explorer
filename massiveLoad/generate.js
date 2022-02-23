const { faker } = require('@faker-js/faker');
const fs = require('fs');

// Initializing variables
var languages = ['ENGLISH', 'SPANISH'];
var statuses = [true, false];
var roles = ['ADMINISTRATOR', 'MANAGER', 'EXPLORER', 'SPONSOR'];

var allActors = [];
var newActor = null;

for (i = 0; i < 20; i++) 
{
	var language = languages[Math.floor(Math.random()*languages.length)];
	var isActive = statuses[Math.floor(Math.random()*statuses.length)];
	var role = roles[Math.floor(Math.random()*roles.length)];

	newActor = {
		name: faker.name.firstName(),
		surname: faker.name.lastName(),
		email: faker.internet.email(),
		password: faker.internet.password(),
		language: language,
		phone_number: faker.phone.phoneNumber(),
		address: faker.address.streetAddress(),
		isActive: isActive,
		role: role,
	};

	console.log(newActor);

	allActors.push(newActor);
}

// convert JSON object to string
const data = JSON.stringify(allActors, null, "\t");

// write JSON string to a file
fs.writeFile('./massiveLoad/actors.json', data, (err) => {
    if (err) {
        throw err;
    }
    console.log("JSON data is saved.");
});

//para poder hacer generación de datos masiva de trips y applications
//1 - las stages deben estar dentro del trip
//2 - en application no se debe colocar el trip_Id, en su lugar el ticker del trip y después con un evento se le agrega el trip a la application