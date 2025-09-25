import axios from 'axios';

// Create axios instance with base configuration
const githubApi = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    'Accept': 'application/vnd.github.v3+json',
  },
});

// Add request interceptor for logging
githubApi.interceptors.request.use(
  (config) => {
    console.log(`Making API request to: ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
githubApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

/**
 * Fetches user data from GitHub API
 * @param {string} username - GitHub username to search for
 * @returns {Promise} Promise resolving to user data
 */
export const fetchUserData = async (username) => {
  try {
    // Validate input
    if (!username || typeof username !== 'string') {
      throw new Error('Invalid username provided');
    }

    const cleanUsername = username.trim();
    
    if (cleanUsername.length === 0) {
      throw new Error('Username cannot be empty');
    }

    console.log(`Fetching data for user: ${cleanUsername}`);
    
    // Make API request
    const response = await githubApi.get(`/users/${cleanUsername}`);
    
    // Return the user data
    return response.data;
    
  } catch (error) {
    // Enhanced error handling
    if (error.response) {
      // GitHub API returned an error response
      switch (error.response.status) {
        case 404:
          throw new Error('User not found');
        case 403:
          throw new Error('API rate limit exceeded. Please try again later.');
        case 401:
          throw new Error('Authentication failed');
        default:
          throw new Error(`GitHub API error: ${error.response.status}`);
      }
    } else if (error.request) {
      // Request was made but no response received
      throw new Error('Network error: Unable to reach GitHub API');
    } else {
      // Something else went wrong
      throw new Error(`Unexpected error: ${error.message}`);
    }
  }
};

/**
 * Optional: Search for multiple users (for future enhancement)
 */
export const searchUsers = async (query) => {
  try {
    const response = await githubApi.get(`/search/users?q=${query}&per_page=5`);
    return response.data;
  } catch (error) {
    throw new Error(`Search failed: ${error.message}`);
  }
};

export default githubApi;