import mongoose from 'mongoose';
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');


dotenv.config({ path: './config.env' });

// CONNECT TO DATABASE
const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD,
  );

// Connection URI
const uri = DB; // Change this URI to match your MongoDB server

// Database Name
const dbName = 'widgets'; // Change this to your database name

// Create a new MongoClient
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Connect to the MongoDB server
async function connectToMongoDB() {
    try {
        await client.connect();
        const db = client.db(dbName);
        console.log('Connected to MongoDB successfully');
        // Perform operations using db object
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

connectToMongoDB();

const widgetSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    soldout: String,
    inventory: String,
    stores: Array,
});

const Widgets = mongoose.model('widgets', widgetSchema);

export { Widgets };