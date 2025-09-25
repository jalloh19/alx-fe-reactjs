import React, { useState } from 'react';
import { searchUsers } from '../services/githubService';

function Search() {
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUserData = async (searchQuery) => {
    try {
      setLoading(true);
      setError(null);
      const data = await searchUsers(searchQuery);
      // Fetch additional user details including location
      const usersWithLocation = await Promise.all(
        data.map(async (user) => {
          const response = await fetch(user.url);
          const details = await response.json();
          return { ...user, location: details.location };
        })
      );
      setUsers(usersWithLocation);
    } catch (err) {
      setError('Error fetching users');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      fetchUserData(query);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search GitHub users..."
          className="p-2 border rounded"
        />
        <button type="submit" className="ml-2 p-2 bg-blue-500 text-white rounded">
          Search
        </button>
      </form>
      
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {users.map((user) => (
          <div key={user.id} className="border p-4 rounded">
            <img src={user.avatar_url} alt={user.login} className="w-20 h-20 rounded-full" />
            <h3 className="mt-2">{user.login}</h3>
            <p className="text-gray-600">Location: {user.location || 'Not available'}</p>
            <a href={user.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-500">
              View Profile
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;