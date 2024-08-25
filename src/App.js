import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({
    Numbers: false,
    Alphabets: false,
    'Highest lowercase alphabet': false
  });

  const handleSubmit = async () => {
    try {
      const response = await axios.post('https://bajajserver.onrender.com/bfhl', JSON.parse(jsonInput));
      setResponseData(response.data);
    } catch (error) {
      alert('Invalid JSON or backend error');
    }
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setSelectedOptions((prevState) => ({
      ...prevState,
      [name]: checked
    }));
  };

  const renderResponse = () => {
    if (!responseData) return null;

    return (
      <div className="bg-light p-3 rounded border">
        {selectedOptions.Numbers && responseData.numbers.length > 0 && (
          <div className="mb-2">
            <strong>Numbers:</strong> {responseData.numbers.join(', ')}
          </div>
        )}
        {selectedOptions.Alphabets && responseData.alphabets.length > 0 && (
          <div className="mb-2">
            <strong>Alphabets:</strong> {responseData.alphabets.join(', ')}
          </div>
        )}
        {selectedOptions['Highest lowercase alphabet'] && responseData.highest_lowercase_alphabet.length > 0 && (
          <div className="mb-2">
            <strong>Highest lowercase alphabet:</strong> {responseData.highest_lowercase_alphabet.join(', ')}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow">
        <h1 className="mb-4">Student Details</h1>
        {responseData && (
          <div className="mb-4">
            <p><strong>Name:</strong> {responseData.user_id.split('_')[0].replace(/_/g, ' ')}</p>
            <p><strong>User ID:</strong> {responseData.user_id}</p>
            <p><strong>Roll Number:</strong> {responseData.roll_number}</p>
          </div>
        )}
        <textarea
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder="Enter JSON input"
          className="form-control mb-3"
          rows="5"
        />
        <button onClick={handleSubmit} className="btn btn-primary mb-3">Submit</button>

        {responseData && (
          <div>
            <label className="form-label">Select Data to Display:</label>
            <div className="form-check">
              <input
                type="checkbox"
                id="numbers"
                name="Numbers"
                className="form-check-input"
                checked={selectedOptions.Numbers}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="numbers" className="form-check-label">Numbers</label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                id="alphabets"
                name="Alphabets"
                className="form-check-input"
                checked={selectedOptions.Alphabets}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="alphabets" className="form-check-label">Alphabets</label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                id="highestLowercaseAlphabet"
                name="Highest lowercase alphabet"
                className="form-check-input"
                checked={selectedOptions['Highest lowercase alphabet']}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="highestLowercaseAlphabet" className="form-check-label">Highest lowercase alphabet</label>
            </div>
            {renderResponse()}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
