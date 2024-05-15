import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from './data/schema';
import resolvers from './data/resolvers';
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

const PORT = 8080;

dotenv.config({ path: './config.env' });

// CONNECT TO DATABASE
const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD,
  );

// Connection URI
const uri = DB; // Change this URI to match your MongoDB server

// Database Name
const dbName = 'graphQL'; // Change this to your database name

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

const app = express();

app.get('/', (req, res) => {
    res.send('GraphQL is amazing!')
});


const root = resolvers;


app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}))

app.listen(PORT, () => console.log(`Running on localhost: ${PORT}/graphql`));