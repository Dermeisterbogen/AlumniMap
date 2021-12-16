# AlumniMap
College Alumni Mapper that shows alumni data based on geo-location, occupation, and more!

## How to Run
1. cd AlumniMap
2. npm install (this will install all necessary modules)
3. Make sure the .env file is present and filled-in correctly
4. To run the Alumni Mapper project locally, cd into Alumni-Map-App and type ng-serve
5. To run the API, cd into api and type nodemon api
6. Navigate to http://localhost:4200/home in your favorite browser

By default, the app will load all markers from the database onto the map.
Use the filter bar, with any combination of majors and minors, to see Alumni that have
graduated with those degrees appear on the map in real time.

The submit button will send the checkbox options to the API and query the database
based on your options. 

The reset button will put all markers back on the map, as if you had not ever filtered
anything to begin with.

Enjoy the app!

Developers:
------------------
William Del Barrio : Project Lead/Back-end Devleoper <br>
Ronald Karamuca: Back-end Architect/Devleoper <br>
Akshit Kumar: Front-end Developer <br>
Tyler Roberts: Database Developer
