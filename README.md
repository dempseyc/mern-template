mongo db stuff
// assumes mongo is installed

// default is 'localhost' and '27017' 
mongo --host <HOSTNAME> --port <PORT>

need to inject db url with env
// in api/src/db.js
`const dbURL = 'mongodb://localhost:27017/mern-template';`

`> use admin`

`$ mongo`
// creates or if db-name exists, returns existing
`> use mern-template`

cd api/
npm install

`$ cd ../client/`
`$ npm install`

// then to start

`$ cd api && npm start`
`$ cd ../client/ && npm start`

// ...advanced?

<!-- db.createUser(
  {
    user: "superuser",
    pwd: "changeMeToAStrongPassword",
    roles: [ "root" ]
  }
) -->

