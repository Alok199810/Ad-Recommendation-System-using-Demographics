# Ad-Recommendation-System-using-Demographics
Developed an end-to-end machine learning-based web application that predicts the most relevant advertisement for a user based on their demographic information (age, gender, income level). The system processes input data, matches it against ad targeting criteria, and outputs the most suitable ad category (e.g., Sports, Drama, Action).
Here’s a simplified version of the README.md file for your Ad Prediction System project — perfect for adding to your GitHub repository:

markdown
Copy
Edit
# 🧠 Ad Prediction System

This project predicts the most relevant advertisement for a user based on their **age**, **gender**, and **income level**. It uses a simple web interface built with **Node.js** and **Python**.

---

## 🔍 What It Does

- Takes user input (age, gender, income level)
- Compares it with ad targeting data (`ads.csv`)
- Suggests the most suitable ad (e.g., Sports, Drama, etc.)

---

## 🗂️ Project Structure

ad_engine_project/
│
├── data/
│ ├── ads.csv
│ ├── user_demographics.csv
│ └── predict_ad.py
│
├── templates/
│ └── index.html
│
├── server.js
└── README.md

yaml
Copy
Edit

---

## 🚀 How to Run

### 1. Install Node.js and Python
Make sure both Node.js and Python are installed.

### 2. Install Node dependencies
```bash
npm install express body-parser
3. Install Python libraries
bash
Copy
Edit
pip install pandas
4. Start the server
bash
Copy
Edit
node server.js
Open your browser at http://localhost:3000

🌐 API Example (Optional)
Send a POST request to /predict-ad:

