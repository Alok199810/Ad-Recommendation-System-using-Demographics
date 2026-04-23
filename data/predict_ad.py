import sys
import joblib 

if len(sys.argv) < 4:
    print("Error: Missing required arguments. Usage: predict_ad.py <age> <gender> <watch_duration>")
    sys.exit(1)

# Load Scaler and Model
scaler = joblib.load('data/scaler.pkl')
model = joblib.load('data/model.pkl')

# Map numeric predictions to category names
ad_categories = {0: 'Horror', 1: 'Drama', 2: 'Action Movies',3: 'Romance'}

# Input from Node.js
age = int(sys.argv[1])
gender = int(sys.argv[2])
watch_duration = int(sys.argv[3])

# Prepare Input
user_features = [[age, gender, watch_duration]]
scaled_features = scaler.transform(user_features)

# Predict and Map
predicted_label = model.predict(scaled_features)[0]
predicted_ad = ad_categories.get(predicted_label, 'Unknown Ad')

print(predicted_ad)
