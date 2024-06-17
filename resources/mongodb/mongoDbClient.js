const { MongoClient } = require('mongodb');

const MONGODB_URI = "mongodb+srv://admin:Admin25042000@clusteraws.xtkgh2i.mongodb.net/?retryWrites=true&w=majority&appName=ClusterAWS&maxIdleTimeMS=60000";

let cachedDb = null;

async function connectToDatabase() {
    if (cachedDb) {
      return cachedDb;
    }
  
    // Connect to our MongoDB database hosted on MongoDB Atlas
    const client = await MongoClient.connect(MONGODB_URI);
  
    // Specify which database we want to use
    const db = await client.db("Caregroup");
  
    cachedDb = db;
    return db;
}

module.exports = { connectToDatabase };