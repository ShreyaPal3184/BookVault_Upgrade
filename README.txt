MongoDB Atlas
- Create a new project. Give name. 
- Create Cluster. Add ip address.
- Copy password and URI to connect to the database.

Server Side
- `npm init -y`
- install required npm modules
- create `index.js` file in server
- create `.env` file
- create utils -> db.js to add mongoDB connection URI
- connect to the databse by importing `db.js` in `index.js`
- Create MODELS(Schema) -> CONTROLLERS and MIDDLEWARE(here, isAuthenticated) -> ROUTES
- After adding routes update `index.js`