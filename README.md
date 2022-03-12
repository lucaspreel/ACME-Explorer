# ACME-Explorer

## 1 - Delete, if exists, database in MongoDB Compass.

    ACME-Explorer

## 2 - In terminal generate data: 

    node .\massiveLoad\0-generate.js

This will create files:

    ./massiveLoad/1-actors.json
    ./massiveLoad/2-trips.json
    ./massiveLoad/3-applications.json
    ./massiveLoad/4-finders.json

## 3 - In terminal start application.

    npm start

## 4 - In Thunder Client run "INITIALIZE APP" tests.

## 5 - Go to MongoDB Compass, database ACME-Explorer, collection actors and rename actor's role from "EXPLORER" to "ADMINISTRATOR".

## 6 - In Thunder Client run "POPULATE COLLECTIONS" tests.

## 7 - In Thunder Client run "APP TESTS" tests.