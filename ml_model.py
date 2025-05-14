import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
import joblib

# Sample synthetic dataset (replace with real data later)
data = {
    'hours': [8, 5, 6.5, 7, 4, 9, 5.5, 8.5],
    'stress': [3, 8, 5, 4, 9, 2, 7, 4],
    'caffeine': [1, 4, 2, 1, 3, 0, 2, 1],
    'exercise': [1, 0, 1, 1, 0, 1, 0, 1],
    'age': [28, 42, 35, 30, 50, 16, 45, 25],
    'gender_female': [1, 0, 1, 0, 1, 0, 1, 0],
    'hormonal': [0, 0, 1, 0, 1, 0, 0, 0],
    'sleep_quality': [4, 2, 3, 4, 1, 5, 2, 4]
}

df = pd.DataFrame(data)

# Features and target
X = df.drop('sleep_quality', axis=1)
y = df['sleep_quality']

# Train model
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X, y)

# Save model
joblib.dump(model, 'sleep_model.joblib')
print("Model trained and saved!")