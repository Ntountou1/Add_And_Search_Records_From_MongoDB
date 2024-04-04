const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const path = require('path');

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// MongoDB connection URL
const mongoUrl = 'mongodb://localhost:27017';
const dbName = 'Petros_users';

// Route handler to save form data to MongoDB
app.post('/saveFormData', async (req, res) => {
    const formData = req.body;
    try {
        const client = await MongoClient.connect(mongoUrl);
        const db = client.db(dbName);
        const collection = db.collection('users');
        await collection.insertOne(formData);
        console.log('Form data saved to MongoDB');
        client.close();
        res.status(200).send('Form data saved successfully');
    } catch (error) {
        console.error('Error saving form data to MongoDB:', error);
        res.status(500).send('Error saving form data to MongoDB');
    }
});

// Function to fetch records from MongoDB
async function fetchRecordsFromDB() {
    try {
        const client = await MongoClient.connect(mongoUrl);
        const db = client.db(dbName);
        const collection = db.collection('users');
        const records = await collection.find({}).toArray();
        client.close();
        return records;
    } catch (error) {
        console.error('Error fetching records from MongoDB:', error);
        return [];
    }
}

// Route handler to fetch all records
app.get('/fetchRecords', async (req, res) => {
    const records = await fetchRecordsFromDB();
    res.json(records);
});

// Route handler to search records
app.post('/searchRecords', async (req, res) => {
    const query = req.body;
    try {
        const client = await MongoClient.connect(mongoUrl);
        const db = client.db(dbName);
        const collection = db.collection('users');
        const records = await collection.find(query).toArray();
        client.close();
        res.json(records);
    } catch (error) {
        console.error('Error searching records in MongoDB:', error);
        res.status(500).send('Error searching records in MongoDB');
    }
});

// Serve static files from the public directory
app.use(express.static(path.join(__dirname)));

// Route handler for the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
