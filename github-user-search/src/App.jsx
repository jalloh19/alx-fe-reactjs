import { useState } from 'react';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="App">
      <header className="App-header">
        <h1>GitHub User Search</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search GitHub users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button className="search-button">
            Search
          </button>
        </div>
      </header>
      <main>
        <p>Enter a username to search for GitHub users</p>
      </main>
    </div>
  );
}

export default App;
