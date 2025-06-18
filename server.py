from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np

app = Flask(__name__)
CORS(app)

model = joblib.load('sleep_model.joblib')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    

    input_data = [
        [
            float(data['hours']),
            int(data['stress']),
            int(data['caffeine']),
            1 if data['exercise'] == 'yes' else 0,
            int(data['age']),
            1 if data['gender'] == 'female' else 0,
            1 if data['hormonal'] == 'yes' else 0
        ]
    ]
    
    prediction = model.predict(input_data)[0]
    score = max(1, min(5, round(prediction)))
    
    return jsonify({
        'score': score,
        'message': get_interpretation(score)
    })

def get_interpretation(score):
    if score >= 4: return "Excellent sleep!"
    elif score >= 3: return "Average sleep."
    elif score >= 2: return "Poor sleep."
    return "Very poor sleep quality."

if __name__ == '__main__':
    app.run(debug=True)
