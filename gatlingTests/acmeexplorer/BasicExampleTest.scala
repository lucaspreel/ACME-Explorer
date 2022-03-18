package acmeexplorer

import scala.concurrent.duration._

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import io.gatling.jdbc.Predef._
import scala.util.Random

class BasicMarketExplorerTest extends Simulation {

	val httpProtocol = http
		.baseUrl("http://localhost:8080/")		

	val headers_0 = Map(
		"Content-Type" -> "application/json")

	val feeder = Iterator.continually(Map(("email", "email"+Random.nextInt(150000)+"@fakemail.com")))

	//ACTORS
	object CreateExplorer {
		val createExplorer = exec(http("POST ACTOR EXPLORER")
			.post("v1/actors")
			.body(ElFileBody("C:/gatling/user-files/resources/acme-explorer/actor-explorer.json"))
			.headers(headers_0))
		.pause(1)
	}
		
	//TRIPS
	object ShowAllTrips {
		val showAllTrips = exec(http("GET ALL TRIPS")
			.get("v1/trips/")
			.headers(headers_0))
		.pause(1)
	}
		
	object ShowTripsByKeyWord {
		val showTripsByKeyWord = exec(http("GET TRIPS BY KEYWORD")
			.get("v1/trips?keyword=lorem")
			.headers(headers_0))
		.pause(1)
	}
		
	object ShowPublishedTrips {
		val showPublishedTrips = exec(http("GET PUBLISHED TRIPS")
			.get("v1/trips?published=true")
			.headers(headers_0))
		.pause(1)
	}

	val actorScn = scenario("Actors").feed(feeder).exec(CreateExplorer.createExplorer)

	val tripScn = scenario("Trips").exec(ShowAllTrips.showAllTrips,
									ShowTripsByKeyWord.showTripsByKeyWord,
									ShowPublishedTrips.showPublishedTrips
									)

	setUp(
		actorScn.inject(rampUsers(5000) during (100 seconds)),
		tripScn.inject(rampUsers(5000) during (100 seconds))
	).protocols(httpProtocol)
     .assertions(
        global.responseTime.max.lt(5000),    
        global.responseTime.mean.lt(1000),
        global.successfulRequests.percent.gt(95)
	)

	/*
	val scn = scenario("BasicMarketExplorerTest")
		.exec(http("POST ACTOR EXPLORER")
			.post("v1/actors")
			.body(RawFileBody("C:/gatling/user-files/resources/acme-explorer/actor-explorer.json"))
			.headers(headers_0))

	setUp(scn.inject(atOnceUsers(1))).protocols(httpProtocol)
	*/
}