import sys
import joblib
import numpy as np

# Load the model and scaler
model = joblib.load('model.pkl')
scaler = joblib.load('scaler.pkl')

def predict_ad(user_features):
    # Scale the features
    scaled_features = scaler.transform([user_features])
    # Predict the ad
    prediction = model.predict(scaled_features)
    return prediction[0]

if __name__ == "__main__":
    # Parse input from Node.js
    user_features = list(map(float, sys.argv[1:]))
    # Predict and print the ad ID
    result = predict_ad(user_features)
    print(result)
