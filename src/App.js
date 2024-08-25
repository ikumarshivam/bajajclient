import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async () => {
    try {
      const response = await axios.post('https://bajajserver.onrender.com/bfhl', JSON.parse(jsonInput));
      setResponseData(response.data);
    } catch (error) {
      alert('Invalid JSON or backend error');
    }
  };

  const handleOptionChange = (event) => {
    const { options } = event.target;
    const selected = Array.from(options).filter(option => option.selected).map(option => option.value);
    setSelectedOptions(selected);
  };

  const renderResponse = () => {
    if (!responseData) return null;
    let dataToShow = {};

    if (selectedOptions.includes('Numbers')) {
      dataToShow.numbers = responseData.numbers;
    }
    if (selectedOptions.includes('Alphabets')) {
      dataToShow.alphabets = responseData.alphabets;
    }
    if (selectedOptions.includes('Highest lowercase alphabet')) {
      dataToShow.highest_lowercase_alphabet = responseData.highest_lowercase_alphabet;
    }

    return <pre className="bg-light p-3 rounded border">{JSON.stringify(dataToShow, null, 2)}</pre>;
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
            <label htmlFor="options" className="form-label">Select Data to Display:</label>
            <select
              id="options"
              multiple={true}
              onChange={handleOptionChange}
              className="form-select mb-3"
              size="3"
            >
              <option value="Numbers">Numbers</option>
              <option value="Alphabets">Alphabets</option>
              <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
            </select>
            {renderResponse()}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
