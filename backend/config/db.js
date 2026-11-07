const { MongoClient } = require('mongodb');

async function connectToDatabase() {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
        throw new Error('MONGODB_URI must be set in the backend environment.');
    }

    const client = new MongoClient(uri);
    await client.connect();

    return {
        client,
        db: client.db()
    };
}

module.exports = { connectToDatabase };
