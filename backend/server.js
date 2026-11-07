const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to Fish Quest API!',
        status: 'Server running successfully'
    });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Fish Quest backend running on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
});