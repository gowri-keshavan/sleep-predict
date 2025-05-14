# Sleep Quality Predictor 🌙

An ML-powered web app that predicts sleep quality based on lifestyle factors.

![App Screenshot](screenshot.png) *(optional: add screenshot later)*

## Features
- **Machine Learning Model**: Random Forest regression
- **Backend**: Python Flask API
- **Frontend**: React.js interface
- **Factors Analyzed**:
  - Sleep duration
  - Stress levels
  - Caffeine intake
  - Exercise
  - Age/Gender
  - Hormonal changes

## Installation

### Backend Setup
```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # Linux/Mac
# venv\Scripts\activate  # Windows

# Install dependencies
pip install -r requirements.txt

# Train the model
python ml_model.py

# Start server
python server.py
