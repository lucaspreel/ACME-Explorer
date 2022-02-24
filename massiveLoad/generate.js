const { faker } = require('@faker-js/faker');
const fs = require('fs');

var amountOfActors = 10;
var amountOfTrips = 10;
var amountOfStagesByTrip = 3;

//FUNCTIONS
var generateMongoObjectId = function () {
    var timestamp = (new Date().getTime() / 1000 | 0).toString(16);
    return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function() {
        return (Math.random() * 16 | 0).toString(16);
    }).toLowerCase();
};

var getRandomArrayValue = function(array) {
	return array[Math.floor(Math.random()*array.length)];
}

var saveJsonFile = function(jsonData, filePath) {

	//truncate file 
	fs.truncate(filePath, 0, function(){console.log('done')})

	// write JSON string to a file
	fs.writeFile(filePath, jsonData, (err) => {
		if (err) {
			throw err;
		}
		console.log("JSON data is saved in file "+filePath+".");
	});
}

//ACTOR'S DATA
// Initializing variables
var languages = ['ENGLISH', 'SPANISH'];
var statuses = [true, false];
var roles = ['ADMINISTRATOR', 'MANAGER', 'EXPLORER', 'SPONSOR'];

var allActors = [];
var managersIds = [];

for (i = 0; i < amountOfActors; i++) 
{
	var language = getRandomArrayValue(languages);
	var isActive = getRandomArrayValue(statuses);
	var role = getRandomArrayValue(roles);
	var actorId = generateMongoObjectId();

	if(role == "MANAGER")managersIds.push(actorId);

	var newActor = {
		_id: actorId,
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

	//console.log(newActor);

	allActors.push(newActor);
}

// convert JSON object to string
const actorsJsonData = JSON.stringify(allActors, null, "\t");
var actorsJsonDataFilePath = "./massiveLoad/actors.json";

saveJsonFile(actorsJsonData, actorsJsonDataFilePath);

//para poder hacer generación de datos masiva de trips y applications
//1 - las stages deben estar dentro del trip
//2 - en application no se debe colocar el trip_Id, en su lugar el ticker del trip y después con un evento se le agrega el trip a la application

//TRIPS' DATA

var allTrips = [];
var tripsIds = [];

for (i = 0; i < amountOfTrips; i++) 
{
	var tripId = generateMongoObjectId();
	var city = faker.address.city();
	var manager_Id = getRandomArrayValue(managersIds);
	var tripPrice = 0;

	tripsIds.push(tripId);

	//stages start
	var allTripStages = [];
	for (j = 0; j < amountOfStagesByTrip; j++)
	{
		var price = Number(faker.commerce.price());
		tripPrice += price;

		var newStage = {
			title: "Zone "+(j+1)+" of city "+city,
			description: faker.lorem.paragraph(),
			price: price
		};
		allTripStages.push(newStage)
	} 
	//stages end

	var newTrip = {
		_id: tripId,
		ticker: faker.datatype.string(11),
		title: "A trip to "+city,
		description: faker.lorem.paragraph(),
		price: tripPrice,
		start_date: faker.date.past(0), 
		end_date: faker.date.future(0),
		publication_date: faker.date.past(0),
		manager_Id: manager_Id,
		stages: allTripStages
	};

	console.log(newTrip);

	allTrips.push(newTrip);
}

// convert JSON object to string
const tripsJsonData = JSON.stringify(allTrips, null, "\t");
var tripsJsonDataFilePath = "./massiveLoad/trips.json";

saveJsonFile(tripsJsonData, tripsJsonDataFilePath);