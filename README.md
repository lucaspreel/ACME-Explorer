# ACME-Explorer

## 1 - Delete, if exists, database in MongoDB Compass.

    ACME-Explorer

## 2 - In terminal generate data: 

    node .\massiveLoad\0-generate.js

This will create these files, please check they are not empty:

    ./massiveLoad/1-actors.json
    ./massiveLoad/2-trips.json
    ./massiveLoad/3-applications.json
    ./massiveLoad/4-finders.json

## 3 - In terminal start application.

    npm start

## 4 - In Thunder Client run "INITIALIZE APP" tests.

## 5 - Go to MongoDB Compass, database ACME-Explorer, collection actors and rename actor's role from "EXPLORER" to "ADMINISTRATOR".

## 6 - In Thunder Client run "POPULATE COLLECTIONS" tests.

## 7 - In Thunder Client run "ACTORS TESTS" tests.

## 8 - In Thunder Client run "SPONSORS TESTS" tests.

## 9 - In Thunder Client run "TRIPS TESTS" tests.

#
# Gatling Tests

## 1 - Download Gatling bundle, choose the non enterprise option.

    https://gatling.io/open-source/start-testing/

## 2 - Extract the files, rename the folder to gatling and put it in the root of drive C, so that this next path is available.

    C:\gatling\bin

## 3 - Create environment variable.

    GATLING_HOME = C:\gatling

## 4 - Add the variable to path.
    
    %GATLING_HOME%\bin

## 5 - To be able to use global gatling command, open a new windows terminal(cmd) or close and reopen visual studio and open a Comand Prompt terminal.

## 6 - In the newly open terminal create a variable with your project's gatling tests folder path, this step is just for convenience.

    SET TESTS_FOLDER=C:\Users\JUANE\Documents\001_master\cloud_arq_saas\ACME-Explorer\gatlingTests\

## 7 - In the same terminal run gatling tests.
    
    gatling --simulations-folder %TESTS_FOLDER%simulations --resources-folder %TESTS_FOLDER%resources --results-folder %TESTS_FOLDER%results

## 8 - The terminal will ask for an optional run description, it can be skipped by pressing enter.

## 9 - Check the tests results by opening in a broser the index.html of the last folder inside %TESTS_FOLDER%results