const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { connectToDatabase } = require('./config/db');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to Fish Quest API!',
        status: 'Server running successfully'
    });
});

const PORT = Number(process.env.PORT) || 3000;

async function startServer() {
    const { client, db } = await connectToDatabase();
    app.locals.db = db;
    console.log('MongoDB connected');

    const server = app.listen(PORT, () => {
        console.log(`Fish Quest backend running on port ${PORT}`);
        console.log(`http://localhost:${PORT}`);
    });

    const shutdown = () => {
        server.close(async (error) => {
            if (error) {
                console.error('Error closing the HTTP server:', error.message);
                process.exitCode = 1;
            }

            try {
                await client.close();
            } catch (closeError) {
                console.error('Error closing the MongoDB connection:', closeError.message);
                process.exitCode = 1;
            }
        });
    };

    process.once('SIGINT', shutdown);
    process.once('SIGTERM', shutdown);
}

startServer().catch((error) => {
    console.error('Failed to start Fish Quest backend:', error.message);
    process.exitCode = 1;
});