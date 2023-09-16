import React, { useState } from 'react';
import './App.css';

function App() {
  const [mainKeywords, setMainKeywords] = useState('');
  const [secondaryKeywords, setSecondaryKeywords] = useState('');
  const [numOfColumns, setNumOfColumns] = useState(3);
  const [result, setResult] = useState([]);

  const handleButtonClick = () => {
    const mainKeywordsArray = mainKeywords.split('\n');
    const secondaryKeywordsArray = secondaryKeywords.split('\n');

    const mainChunkSize = Math.ceil(mainKeywordsArray.length / numOfColumns);
    const secondaryChunkSize = Math.ceil(secondaryKeywordsArray.length / numOfColumns);

    const mainChunks = Array.from({ length: numOfColumns }, (v, i) =>
      mainKeywordsArray.slice(i * mainChunkSize, i * mainChunkSize + mainChunkSize));

    const secondaryChunks = Array.from({ length: numOfColumns }, (v, i) =>
      secondaryKeywordsArray.slice(i * secondaryChunkSize, i * secondaryChunkSize + secondaryChunkSize));

    const resultChunks = mainChunks.map((mainChunk, index) => [...mainChunk, ...secondaryChunks[index]]);

    setResult(resultChunks);
  };

  return (
    <div className="App">
      <textarea onChange={(e) => setMainKeywords(e.target.value)} placeholder="Main Keywords" />
      <textarea onChange={(e) => setSecondaryKeywords(e.target.value)} placeholder="Secondary Keywords" />
      <input onChange={(e) => setNumOfColumns(parseInt(e.target.value))} type="number" min="3" max="5" value={numOfColumns} />
      <button onClick={handleButtonClick}>Execute</button>
      {result.map((chunk, i) => (
        <textarea key={i} value={chunk.join(', ')} readOnly />
      ))}
    </div>
  );
}

export default App;
