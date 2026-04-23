const express = require('express');
const { exec } = require('child_process');

const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Endpoint for predicting ads
app.post('/predict', (req, res) => {
    const { age, gender, watchDuration } = req.body;
app.post('/predict-ad', (req, res) => {
    console.log('Request Body:', req.body);
    res.json({ adId: 1, message: 'Predicted Ad for the User' });
});
    

    // Validate input
    if (age === undefined || gender === undefined || watchDuration === undefined) {
        return res.status(400).json({ error: 'Invalid input. Provide age, gender, and watchDuration.' });
    }

    // Call the Python script
    const pythonScript = `python predict_ad.py ${age} ${gender} ${watchDuration}`;
    exec(pythonScript, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${stderr}`);
            return res.status(500).json({ error: 'Prediction failed.' });
        }

        // Return the predicted ad
        const predictedAd = stdout.trim();
        res.json({ predictedAd });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
