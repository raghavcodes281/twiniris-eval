// Importing MongoClient from the mongodb package to interact with MongoDB.
import { MongoClient } from 'mongodb';

// Defining the URI for the MongoDB instance running locally on port 27017.
const uri = 'mongodb://localhost:27017';

// Creating a new MongoClient instance with the defined URI.
const client = new MongoClient(uri);

// Function to connect to the MongoDB server.
async function connectToMongo() {
    try {
        // Attempting to connect to the MongoDB server.
        await client.connect();
        console.log('Connected to MongoDB'); // Logging successful connection.
        // Returning the default database named 'twiniris'.
        return client.db('twiniris');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error); // Logging connection errors.
        throw error; // Re-throwing the caught error to handle it further up the call stack.
    }
}

// Function to find a soil type within a given geographical area.
async function findSoilType(db, point) {

    const soilTypes = db.collection('soiltypes'); // Accessing the 'soiltypes' collection.

    //Since I have already created a 2dsphere index in my compass ui
    //If you want to create the 2dsphere index via code then uncomment the below line
    
    //db.collection('soiltypes').createIndex({ geometry: "2dsphere" });

    try {
        // Performing a geospatial query to find documents where the geometry intersects with the given point.
        const result = await soilTypes.findOne({
            geometry: {
                $geoIntersects: {
                    $geometry: {
                        type: 'Point', // Specifying the type of geometry.
                        coordinates: point // Using the provided coordinates for the query.
                    }
                }
            }
        });

        // Returning the soil type property if found, otherwise returning a message indicating not found.
        return result? result.properties.soilType : 'Soil type not found for the given coordinates.';
    } catch (error) {
        console.error('Error finding soil type:', error); // Logging errors during the query.
        throw error; // Re-throwing the caught error to handle it further up the call stack.
    }
}

// Main asynchronous function that orchestrates the process.
async function main() {
    try {
        // Connecting to the MongoDB database.
        const db = await connectToMongo();
        // Defining the coordinates for the point of interest.
        // Change these coordinates to find other soil type of a location
        const pointCoordinates = [-122.49, 45.58];
        // Finding the soil type for the given coordinates.
        const soilType = await findSoilType(db, pointCoordinates);
        console.log('Soil type:', soilType); // Logging the found soil type.
    } catch (error) {
        console.error('An error occurred:', error); // Logging any errors that occur during execution.
    } finally {
        // Ensuring the MongoDB connection is closed after the operation.
        await client.close();
        console.log('MongoDB connection closed'); // Logging the closure of the connection.
    }
}

// Calling the main function to execute the program.
main();
