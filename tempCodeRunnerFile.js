const express = require('express');
const { exec } = require('child_process');

const app = express();
const port = 3001;


app.use(express.json());


app.post('/predict-ad', (req, res) => {
    const { age, gender, watchDuration } = req.body;

    console.log('Request Body:', req.body);

    
    if (age === undefined || gender === undefined || watchDuration === undefined) {
        return res.status(400).json({ error: 'Invalid input. Provide age, gender, and watchDuration.' });
    }

    
    const pythonScript = `python predict_ad.py ${age} ${gender} ${watchDuration}`;
    exec(pythonScript, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${stderr}`);
            return res.status(500).json({ error: 'Prediction failed.' });
        }

        
        const predictedAd = stdout.trim();
        res.json({ predictedAd });
    });
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
