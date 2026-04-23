const express = require('express'); // Declare express only once
const bodyParser = require('body-parser');
const { spawn } = require('child_process');
const path = require('path');

const app = express();
const port = 3000;

// Middleware to parse JSON payloads
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

// Serve the HTML file for the frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Endpoint to predict ads
app.post('/predict-ad', (req, res) => {
    const { age, gender, watchDuration } = req.body;

    const pythonProcess = spawn('python', [
        'data/predict_ad.py',
        age,
        gender,
        watchDuration
    ]);

    let result = '';
    let error = '';

    pythonProcess.stdout.on('data', (data) => {
        result += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
        error += data.toString();
    });

    pythonProcess.on('close', (code) => {
        if (code !== 0) {
            console.error(error);
            return res.status(500).json({ error: 'Prediction failed.' });
        }

        const prediction = result.trim();
        res.json({ predictedAd: `Predicted Ad: ${prediction}` });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
