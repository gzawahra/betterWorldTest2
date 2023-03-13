# betterWorldTest2

To start the project:

1. in a terminal go inside the project dir.
2. run docker-compose up -d
2. go inside the backend repo and run:
  npm install && npm run start 
3. leave the first terminal open and in another one go to the forntend repo and run: 
  npm install && npm run serve 

localhost:3300/network displays the result of the GET request to the CityBikes api, 
localhost:5000 links to the adminer docker container, in adminer using the databas etype PostgreSQL,
username auser, password apassword, and db name networkdb you can connect to the database and view the 
database architecture.
localhost:8080 links to the default VueJs start page.
