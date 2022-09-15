cd into /api and `npm install`
cd into /next-client and `npm install`

`touch/api/.env`

```
TOKEN_KEY="<your secret>"
DB_URL="mongodb://localhost:27017/<your db name>"
```

`touch /next-client/.env.local`

etc. *these constants do not refer to the nextjs /src/pages/api

```
REACT_APP_API_URL="<where api lives in production>"
REACT_APP_DEV_API_URL="http://localhost:3002/"
REACT_APP_CABLE_URL="<where cable lives in production>"
REACT_APP_DEV_CABLE_URL="http://localhost:8000"
REACT_APP_API2_URL="https://api.themoviedb.org/3/"
REACT_APP_DEV_API2_URL="https://api.themoviedb.org/3/"
REACT_APP_API2_KEY="<key you got from themoviedb.org>"
REACT_APP_API2_TOKEN="<token you got from themoviedb.org>"
```

root/api/src/db/seed_db.js like:


`node ./api/src/db/seed_db.js`

