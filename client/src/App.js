import React, { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    hours: '',
    stress: '',
    caffeine: '',
    exercise: 'no',
    age: '',
    gender: 'male',
    hormonal: 'no'
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({ error: 'Failed to connect to server' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>Advanced Sleep Quality Predictor</h1>
      <form onSubmit={handleSubmit}>
        {/* Basic Sleep Info */}
        <div className="form-group">
          <label>Hours slept last night:</label>
          <input 
            type="number" 
            name="hours" 
            value={formData.hours}
            onChange={handleChange}
            step="0.1"
            min="0"
            max="24"
            required
          />
        </div>
        
        <div className="form-group">
          <label>Current stress level (1-10):</label>
          <input 
            type="number" 
            name="stress" 
            value={formData.stress}
            onChange={handleChange}
            min="1" 
            max="10"
            required
          />
        </div>
        
        <div className="form-group">
          <label>Caffeine drinks consumed yesterday:</label>
          <input 
            type="number" 
            name="caffeine" 
            value={formData.caffeine}
            onChange={handleChange}
            min="0"
            required
          />
        </div>
        
        <div className="form-group">
          <label>Exercised yesterday?</label>
          <select name="exercise" value={formData.exercise} onChange={handleChange}>
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </div>
        
        {/* New Demographic Fields */}
        <div className="form-group">
          <label>Age:</label>
          <input 
            type="number" 
            name="age" 
            value={formData.age}
            onChange={handleChange}
            min="13"
            max="120"
            required
          />
        </div>
        
        <div className="form-group">
          <label>Gender:</label>
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        
        <div className="form-group">
          <label>Experiencing hormonal changes? (menstruation, menopause, etc.)</label>
          <select name="hormonal" value={formData.hormonal} onChange={handleChange}>
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </div>
        
        <button type="submit" disabled={loading}>
          {loading ? 'Predicting...' : 'Predict Sleep Quality'}
        </button>
      </form>
      
      {result && (
        <div className={`result ${result.error ? 'error' : ''}`}>
          {result.error ? (
            <p>{result.error}</p>
          ) : (
            <>
              <h2>Your sleep quality: {result.score}/5</h2>
              <p>{result.message}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default App;