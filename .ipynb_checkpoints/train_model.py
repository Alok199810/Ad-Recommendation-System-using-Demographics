import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
import joblib

# Sample data
data = {
    'age': [25, 30, 22, 40, 35],
    'gender': [1, 0, 1, 0, 1],  # 1 = Male, 0 = Female
    'watch_duration': [120, 150, 180, 90, 100],
    'ad_id': [1, 2, 1, 2, 1]
}

# Convert data into a DataFrame
df = pd.DataFrame(data)

# Features (X) and target (y)
X = df[['age', 'gender', 'watch_duration']]
y = df['ad_id']

# Split data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Scale features (age and watch_duration)
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train[['age', 'watch_duration']])
X_test_scaled = scaler.transform(X_test[['age', 'watch_duration']])

# Combine scaled features with gender (since gender doesn't need scaling)
X_train_scaled = np.hstack((X_train_scaled, X_train[['gender']].values))
X_test_scaled = np.hstack((X_test_scaled, X_test[['gender']].values))

# Train the Random Forest model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train_scaled, y_train)

# Save the model and scaler to disk
joblib.dump(model, 'ad_prediction_model.pkl')
joblib.dump(scaler, 'scaler.pkl')

# Evaluate the model (optional)
accuracy = model.score(X_test_scaled, y_test)
print(f"Model Accuracy: {accuracy}")
