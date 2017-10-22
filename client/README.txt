********************************************************
Crossover application test for Front End Architect
********************************************************
Author: Waldir J. Pereira Junior
E-mail: waldirpereira@gmail.com
Date:   2017-10-22
********************************************************

--------------------------------------------------------
Introduction
--------------------------------------------------------
In this file I will try to show the architecture of the application and the mainly
features I've developed. There are three features:
    + Todo list
    + About
    + Tests
    + Login/Logout

All the features work as a Single Page Application, with ngRoute for route managing.

--------------------------------------------------------
How to run
--------------------------------------------------------
Just copy all files inside the "Code" folder to thew "client" folder of the given
structure.

Then follow these steps:

0. run the server steps (npm install, mongod and npm start)
1. go to client folder (eg.: cd client)
2. npm install
3. gulp
4. go to browser and open http://localhost:3000

--------------------------------------------------------
Structure
--------------------------------------------------------
+ index.html
+ README.txt
+ gulpfile.js
+ package.js
+ content
    + coverage
    + styles
        + app
        + fonts
        + vendor
            + ...
    + templates
+ scripts
    + app
        + about
        + login
        + todo
    + vendor
        + ...
+ test
    + conf
    + scripts
        + app
        + spec
        + vendor
