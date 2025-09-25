import React, { useState } from 'react';
import { searchUsers } from '../services/githubService';

function Search() {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [minRepos, setMinRepos] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setUsers([]);

    try {
      const results = await searchUsers(query, location, minRepos);
      setUsers(results);
    } catch (err) {
      setError(err.message || 'Error searching users. Please try again.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search GitHub users..."
              className="w-full px-3 py-2 bg-[#f6f8fa] border border-[#d0d7de] rounded-md 
                      text-[#24292f] placeholder-[#6e7781] focus:outline-none 
                      focus:border-[#0969da] focus:ring-1 focus:ring-[#0969da]"
              required
            />
          </div>
          <div className="flex gap-3">
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
              className="w-full md:w-48 px-3 py-2 bg-[#f6f8fa] border border-[#d0d7de] 
                      rounded-md text-[#24292f] placeholder-[#6e7781]"
            />
            <input
              type="number"
              value={minRepos}
              onChange={(e) => setMinRepos(e.target.value)}
              placeholder="Min repos"
              className="w-full md:w-36 px-3 py-2 bg-[#f6f8fa] border border-[#d0d7de] 
                      rounded-md text-[#24292f] placeholder-[#6e7781]"
              min="0"
            />
            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-2 text-white font-semibold rounded-md transition-colors
                      ${loading ? 'bg-[#94d3a2] cursor-not-allowed' : 'bg-[#2da44e] hover:bg-[#2c974b]'}`}
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </div>
      </form>

      {error && (
        <div className="text-center py-4 text-[#cf222e]">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user) => (
          <div key={user.id} className="border border-[#d0d7de] rounded-lg p-4 bg-white">
            <div className="flex items-start space-x-4">
              <img
                src={user.avatar_url}
                alt={user.login}
                className="w-16 h-16 rounded-full"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-[#24292f]">{user.login}</h3>
                <p className="text-[#57606a] text-sm">
                  {user.location || 'Location not available'}
                </p>
                <p className="text-[#57606a] text-sm mb-2">
                  Repositories: {user.public_repos}
                </p>
                <a
                  href={user.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0969da] hover:underline"
                >
                  View Profile
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;