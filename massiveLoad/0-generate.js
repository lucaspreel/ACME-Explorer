const { faker } = require("@faker-js/faker");
const fs = require("fs");

var amountOfActors = 10000;
var amountOfTrips = 10000;
var amountOfStagesByTrip = 3;
var amountOfApplications = 10000;

var minumunStagePrice = 10;
var maximunStagePrice = 50;
var minimunFinderPriceLowerBound = 0;
var maximunFinderPriceLowerBound = 50;
var maximunFinderPriceUpperBound = 150;

var threeYearsAgo = new Date();
threeYearsAgo.setFullYear(threeYearsAgo.getFullYear() - 3);
// console.log(threeYearsAgo);

//------------------------------------------------------------------------------
//FUNCTIONS
//------------------------------------------------------------------------------
var generateMongoObjectId = function () {
  var timestamp = ((new Date().getTime() / 1000) | 0).toString(16);
  return (
    timestamp +
    "xxxxxxxxxxxxxxxx"
      .replace(/[x]/g, function () {
        return ((Math.random() * 16) | 0).toString(16);
      })
      .toLowerCase()
  );
};

var getRandomArrayValue = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var formatJsonToBeWrittenToAFile = function (jsonData) {
  // convert JSON object to string
  return JSON.stringify(jsonData, null, "\t");
};

var saveJsonFile = function (jsonData, filePath) {
  //truncate file
  fs.truncate(filePath, 0, function () {
    console.log("File " + filePath + " truncated");
  });

  // write JSON string to a file
  fs.writeFile(filePath, jsonData, (err) => {
    if (err) {
      throw err;
    }
    console.log(
      "JSON data has been successfully saved in file " + filePath + "."
    );
  });
};

//------------------------------------------------------------------------------
//ACTORS' DATA
//------------------------------------------------------------------------------
var languages = ["ENGLISH", "SPANISH"];
var statuses = [true, false];
var roles = ["ADMINISTRATOR", "MANAGER", "EXPLORER", "SPONSOR"];

var allActors = [];
var managersIds = [];
var explorersIds = [];

for (i = 0; i < amountOfActors; i++) {
  var language = getRandomArrayValue(languages);
  var isActive = getRandomArrayValue(statuses);
  var role = getRandomArrayValue(roles);
  var actorId = generateMongoObjectId();

  if (role == "MANAGER") managersIds.push(actorId);
  if (role == "EXPLORER") explorersIds.push(actorId);

  var newActor = {
    _id: {
      $oid: actorId,
    },
    name: faker.name.firstName(),
    surname: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    language: language,
    phone_number: faker.phone.phoneNumber(),
    address: faker.address.streetAddress(),
    isActive: isActive,
    role: role,
    deleted: false,
  };
  //console.log(newActor);

  allActors.push(newActor);
}

const actorsJsonData = formatJsonToBeWrittenToAFile(allActors);
var actorsJsonDataFilePath = "./massiveLoad/1-actors.json";
saveJsonFile(actorsJsonData, actorsJsonDataFilePath);

//------------------------------------------------------------------------------
//TRIPS' DATA
//------------------------------------------------------------------------------
var allTrips = [];
var nonCanceledTrips = [];
var canceledStatuses = [true, false, false, false, false]; //more false options so that the amount of canceled trips is minor

for (i = 0; i < amountOfTrips; i++) {
  var tripId = generateMongoObjectId();
  var city = faker.address.city();
  var manager_Id = getRandomArrayValue(managersIds);
  var tripPrice = 0;
  var canceled = getRandomArrayValue(canceledStatuses);
  var cancelReason = canceled == true ? faker.lorem.sentence() : "";
  var publication_date = faker.date.future(
    (years = 3),
    (refDate = threeYearsAgo)
  );
  var start_date = faker.date.future((years = 3), (refDate = publication_date));
  var end_date = faker.date.future((years = 3), (refDate = start_date));

  //stages start
  var allTripStages = [];
  for (j = 0; j < amountOfStagesByTrip; j++) {
    var price = Number(
      faker.commerce.price((min = minumunStagePrice), (max = maximunStagePrice))
    );
    tripPrice += price;

    var newStage = {
      title: "Zone " + (j + 1) + " of city " + city,
      description: faker.lorem.paragraph(),
      price: price,
    };
    allTripStages.push(newStage);
  }
  //stages end

  var newTrip = {
    _id: {
      $oid: tripId,
    },
    ticker: faker.datatype.string(11),
    title: "A trip to " + city,
    description: faker.lorem.paragraph(),
    price: tripPrice,
    publication_date: publication_date,
    start_date: start_date,
    end_date: end_date,
    manager_Id: manager_Id,
    stages: allTripStages,
    canceled: canceled,
    cancelReason: cancelReason,
  };
  //console.log(newTrip);

  if (canceled == false) nonCanceledTrips.push(newTrip);
  allTrips.push(newTrip);
}

const tripsJsonData = formatJsonToBeWrittenToAFile(allTrips);
var tripsJsonDataFilePath = "./massiveLoad/2-trips.json";
saveJsonFile(tripsJsonData, tripsJsonDataFilePath);

//------------------------------------------------------------------------------
//APPLICATIONS' DATA
//------------------------------------------------------------------------------
var allApplications = [];
var statuses = ["PENDING", "DUE", "ACCEPTED", "CANCELLED", "REJECTED"];
var maximunPossibleApplications = nonCanceledTrips.length * explorersIds.length;
var amountOfApplications = Math.min(
  amountOfApplications,
  maximunPossibleApplications
);
console.log("amountOfApplications");
console.log(amountOfApplications);

for (i = 0; i < amountOfApplications; i++) {
  var trip = null;
  var explorer_Id = null;
  var passedVerificationExplorerHasNotYetApplied = false;

  while (passedVerificationExplorerHasNotYetApplied == false) {
    trip = getRandomArrayValue(nonCanceledTrips);
    explorer_Id = getRandomArrayValue(explorersIds);

    var explorerAlreadyApplied = allApplications.filter(function (application) {
      return (
        application.trip_Id == trip._id &&
        application.explorer_Id == explorer_Id
      );
    });
    // console.log("explorerAlreadyApplied");
    // console.log(explorerAlreadyApplied);
    // console.log(explorerAlreadyApplied.length);
    if (explorerAlreadyApplied.length == 0) {
      passedVerificationExplorerHasNotYetApplied = true;
    }
  }

  var status = getRandomArrayValue(statuses);
  var publication_date = trip.publication_date;
  var start_date = trip.start_date;
  var applicationMoment = faker.date.betweens(
    (from = publication_date),
    (to = start_date),
    (num = 1)
  )[0];
  var rejected_reason = status == "REJECTED" ? faker.lorem.sentence() : "";

  var newApplication = {
    applicationMoment: applicationMoment,
    comments: faker.lorem.sentence(),
    status: status,
    explorer_Id: explorer_Id,
    trip_Id: trip._id.$oid,
    manager_Id: trip.manager_Id,
    deleted: false,
    rejected_reason: rejected_reason,
    tripPrice: trip.price,
  };
  // console.log(newApplication);

  allApplications.push(newApplication);
}

const applciationsJsonData = formatJsonToBeWrittenToAFile(allApplications);
var applciationsJsonDataFilePath = "./massiveLoad/3-applications.json";
saveJsonFile(applciationsJsonData, applciationsJsonDataFilePath);

//------------------------------------------------------------------------------
//FINDERS' DATA
//------------------------------------------------------------------------------
var allFinders = [];

for (i = 0; i < explorersIds.length; i++) {
  var explorer_Id = explorersIds[i];

  var keyWord = faker.lorem.word();
  var priceLowerBound = Number(
    faker.commerce.price((min = minimunFinderPriceLowerBound)),
    (max = maximunFinderPriceLowerBound)
  );
  var priceUpperBound = Number(
    faker.commerce.price((min = priceLowerBound + 1)),
    (max = maximunFinderPriceUpperBound)
  );
  var dateLowerBound = faker.date.future(
    (years = 3),
    (refDate = threeYearsAgo)
  );
  var dateUpperBound = faker.date.future(
    (years = 3),
    (refDate = dateLowerBound)
  );

  var results = allTrips.filter(function (trip) {
    var priceMatchs =
      priceLowerBound <= trip.price && trip.price <= priceUpperBound;
    var dateMatches =
      new Date(dateLowerBound) <= new Date(trip.start_date) &&
      new Date(trip.end_date) <= new Date(dateUpperBound);
    var keyWordMatches =
      trip.ticker.includes(keyWord) ||
      trip.title.includes(keyWord) ||
      trip.description.includes(keyWord);

    return priceMatchs && dateMatches && keyWordMatches;
  });

  var newFinder = {
    keyWord: keyWord,
    priceLowerBound: priceLowerBound,
    priceUpperBound: priceUpperBound,
    dateLowerBound: dateLowerBound,
    dateUpperBound: dateUpperBound,
    results: results,
    explorer_Id: explorer_Id,
  };
  //console.log(newFinder);

  allFinders.push(newFinder);
}

const findersJsonData = formatJsonToBeWrittenToAFile(allFinders);
var findersJsonDataFilePath = "./massiveLoad/4-finders.json";
saveJsonFile(findersJsonData, findersJsonDataFilePath);
