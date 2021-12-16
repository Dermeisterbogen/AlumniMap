# AlumniMap
College Alumni Mapper that shows alumni data based on geo-location, occupation, and more!

## How to Run
1. Clone the repo: git clone git@github.com:rkaramuca/AlumniMap.git
2. cd AlumniMap/Web/api
3. npm install
4. Add the correct .env file with the database config 
5. Run: node api
6. Navigate to https://rkaramuca.github.io/AlumniMap/home

## How to Update on GitHub Pages
1. npm i angular-cli-ghpages --save-dev
2. ng build --prod --base-href "https://rkaramuca.github.io/AlumniMap/"
3. npx angular-cli-ghpages --dir=dist/Alumni-Map-App

## Usage Information

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
