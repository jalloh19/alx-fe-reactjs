import { useState } from 'react';
import { fetchUserData } from '../services/githubService';

const Search = () => {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim()) return;

    setLoading(true);
    setError(null);
    setUser(null);
    setSearched(true);

    try {
      const userData = await fetchUserData(username.trim());
      setUser(userData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setUsername('');
    setUser(null);
    setError(null);
    setSearched(false);
    setLoading(false);
  };

  return (
    <div className="search-component">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-container">
          <input
            type="text"
            placeholder="Enter GitHub username..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="search-input"
            disabled={loading}
          />
          <button 
            type="submit" 
            className="search-button"
            disabled={loading || !username.trim()}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>

      {/* Display Results */}
      <div className="search-results">
        {/* Loading State */}
        {loading && (
          <div className="state-message loading">
            <div className="spinner"></div>
            <p>Loading...</p>
          </div>
        )}

        {/* Error State - Specifically for "User not found" */}
        {error && !loading && error === 'User not found' && (
          <div className="state-message error">
            <p>Looks like we cant find the user</p>
            <button onClick={handleReset} className="retry-button">
              Try Again
            </button>
          </div>
        )}

        {/* Other Errors */}
        {error && !loading && error !== 'User not found' && (
          <div className="state-message error">
            <p>{error}</p>
            <button onClick={handleReset} className="retry-button">
              Try Again
            </button>
          </div>
        )}

        {/* Success State - User Found */}
        {user && !loading && !error && (
          <div className="user-result">
            <div className="user-card">
              <div className="user-avatar">
                <img src={user.avatar_url} alt={`${user.login}'s avatar`} />
              </div>
              <div className="user-info">
                <h2>{user.name || user.login}</h2>
                <p className="username">@{user.login}</p>
                {user.bio && <p className="user-bio">{user.bio}</p>}
                <div className="user-stats">
                  <span>Followers: {user.followers}</span>
                  <span>Following: {user.following}</span>
                  <span>Repos: {user.public_repos}</span>
                </div>
                <a 
                  href={user.html_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="profile-link"
                >
                  View GitHub Profile
                </a>
              </div>
            </div>
            <button onClick={handleReset} className="reset-button">
              Search Another User
            </button>
          </div>
        )}

        {/* No results after search */}
        {searched && !user && !loading && !error && (
          <div className="state-message initial">
            <p>Enter a username to search for GitHub users</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;