# Personal Budget (Envelopes Budget Manager)

Simple backend API to manage a portfolio budget using an envelope budgeting method~   
Users can create, read, update, and delete envelopes.

## Running the app
To run locally, run `npm install`, then `npm run start`

Once the app is running locally, you can access the API at `http://localhost:5000/`

## Caveats
The app is currently using a javascript object to store the data.  
This is not a good solution for a production app, but it is a good solution for a demo app. In a production app, you would want to use a database to store the data.  
It also means that the data will be lost when the app is restarted.

## Testing with Swagger
Swagger documentation and testing available at `http://localhost:5000/api-swagger`

To test with Swagger:
 - Retrieve envelopes using `GET /api/v1/envelopes`
 - Find a single envelope using `GET /api/v1/envelopes/{id}`
 - Create an envelope using `POST /api/v1/envelopes`
 - Update an envelope using `PUT /api/v1/envelope/{id}`
 - Delete an envelope using `DELETE /api/v1/envelope/{id}`
 - Transfer money between envelopes using `POST /api/v1/envelope/{from}/transfer/{to}`