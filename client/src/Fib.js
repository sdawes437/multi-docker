import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Fib = () => {
  const [seenIndexes, setSeenIndexes] = useState([]);
  const [values, setValues] = useState({});
  const [index, setIndex] = useState('');

  useEffect(() => {
    const fetchValues = async () => {
      try {
        const values = await axios.get('/api/values/current');
        setValues(values.data);
      } catch (err) {
        console.error(err.message);
      }
    };
    const fetchIndexes = async () => {
      try {
        const indexes = await axios.get('/api/values/all');
        setSeenIndexes(indexes.data);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchValues();
    fetchIndexes();
  }, []);

  const renderSeenIndexes = () => {
    return seenIndexes.map(({ number }) => number).join(', ');
  };

  const renderValues = () => {
    const entries = [];
    if (Object.keys(values).length !== 0) {
      for (let key in values) {
        entries.push(
          <div key={key}>
            For index {key} I calculated {values[key]}
          </div>
        );
      }
    }
    return entries;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post('/api/values', {
        index: index,
      });

      setIndex('');
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Enter your index:</label>
        <input
          value={index}
          onChange={(event) => setIndex(event.target.value)}
        />
        <button>Submit</button>
      </form>
      <h3>Indexes I have seen:</h3>
      {renderSeenIndexes()}
      <h3>Calculated Values:</h3>
      {renderValues()}
    </div>
  );
};

export default Fib;
