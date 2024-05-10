import  dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

/**
 * ES6 module for interacting with MongoDB
 * @returns {Object} - Object containing functions to interact with MongoDB
 */
const mongo = () => {
    // Load the environment variables from the .env file
    dotenv.config();

    const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;
    const mongoURL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;

    let client;
    let db;

    /**
     * Opens a connection to the MongoDB database
     */
    async function connect() {
        try {
            client = new MongoClient(mongoURL);
            await client.connect();
            db = client.db();

            console.log('Opened connection to MongoDB');
        } catch (err) {
            console.error(err);
        }
    }

    /**
     * Closes the connection to the MongoDB database
     */
    async function close() {
        try {
            await client.close();

            console.log('Closed connection to MongoDB');
        } catch (err) {
            console.error(err);
        }
    }

    /**
     * Creates a new document in the specified collection
     * @param {string} TeamStatCheck - name of the collection
     * @param {Object} data - data to be inserted into the collection
     */
    async function create(TeamStatCheck, data) {
        try {
            const StatCheck = db.collection(TeamStatCheck);
            await StatCheck.insertOne(data);
        } catch (err) {
            console.error(err);
        }
    }

    /**
     * Finds documents in the specified collection
     * @param {string} TeamStatCheck - name of the collection
     * @param {string} Stats - identifier for filtering documents
     * @returns {Promise<Document>} - a document or an array of ducments
     */
    async function find(TeamStatCheck, Stats) {
        try {
            const StatCheck = db.collection(TeamStatCheck);

            if (Stats) {
                return await StatCheck.find({ Stat: Stats }).next();
            } else {
                return await StatCheck
                    .find({})
                    .limit(10)
                    .sort({ _id: -1 })
                    .toArray();
            }
        } catch (err) {
            console.error(err);
        }
    }
    /**
     * Updates documents in the specified collection
     * @param {string} TeamStatCheck - name of the collection
     * @param {string} Stats - identifier for filtering documents
     * @param {Object} data - the data to be updated
     */
    async function update(TeamStatCheck, Stats, data) {
        try {
            const StatCheck = db.collection(TeamStatCheck);
            await StatCheck.updateOne(
                { Stat: Stats },
                { $set: data }
            );
        } catch (err) {
            console.error("There is an error", err);
        }
    }


    return {
        connect,
        close,
        create,
        find,
        update
    };
};

export default mongo();