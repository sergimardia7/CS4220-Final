import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

dotenv.config();

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;
const mongoURL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;

let client;
let db;

export async function connect() {
    try {
        client = new MongoClient(mongoURL);
        await client.connect();
        db = client.db();
        console.log('Opened connection to MongoDB');
    } catch (err) {
        console.error(err);
    }
}

export async function close() {
    try {
        await client.close();
        console.log('Closed connection to MongoDB');
    } catch (err) {
        console.error(err);
    }
}

export async function create(collectionName, data) {
    try {
        const collection = db.collection(collectionName);
        await collection.insertOne(data);
    } catch (err) {
        console.error(err);
    }
}

export async function find(collectionName, query = {}) {
    try {
        const collection = db.collection(collectionName);
        return await collection.find(query).toArray();
    } catch (err) {
        console.error(err);
    }
}

export async function update(collectionName, query, updateData) {
    try {
        const collection = db.collection(collectionName);
        await collection.updateOne(query, { $set: updateData }, { upsert: true });
    } catch (err) {
        console.error(err);
    }
}
