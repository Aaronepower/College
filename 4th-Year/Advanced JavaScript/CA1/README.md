# Setup

- Install [Node v5.10](https://nodejs.org/en/) or greater. 
- Install [MongoDB Windows 2008 64bit](https://www.mongodb.org/)
- run command `npm install` within project directory
- run command `'C:\Program Files\MongoDB 2.6 Standard\bin\mongod.exe' --dbpath=./data/db`
- Or anywhere were you have installed mongoDB, the `dbpath` option is also optional, but already has database entries to better showcase the application
- run command `npm install -g gulp && gulp`
- The server should be up, and running at `http://localhost:3000`