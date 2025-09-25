import axios from 'axios';

const GITHUB_API_URL = 'https://api.github.com/search/users';

/**
 * Advanced search for GitHub users with multiple criteria
 * @param {Object} criteria - Search criteria object
 * @param {number} page - Page number for pagination
 * @returns {Promise} Promise resolving to search results
 */
export const searchUsers = async (criteria = {}, page = 1) => {
  try {
    const {
      username = '',
      location = '',
      minRepos = '',
      language = '',
      followers = '',
      sort = 'joined',
      order = 'desc'
    } = criteria;

    // Build query string using GitHub's search syntax
    const queryParts = [];
    
    if (username) queryParts.push(`${username} in:login`);
    if (location) queryParts.push(`location:${location}`);
    if (minRepos) queryParts.push(`repos:>${minRepos}`);
    if (language) queryParts.push(`language:${language}`);
    if (followers) queryParts.push(`followers:>${followers}`);
    
    const query = queryParts.join('+');
    
    if (!query) {
      throw new Error('Please provide at least one search criteria');
    }

    const params = {
      q: query,
      page: page,
      per_page: 30,
      sort: sort,
      order: order
    };

    console.log('Searching users with params:', params);
    
    const response = await axios.get(`${GITHUB_API_URL}?q=${encodeURIComponent(query)}`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json'
      }
    });
    
    // If we have results, fetch detailed information for each user
    if (response.data.items && response.data.items.length > 0) {
      const usersWithDetails = await Promise.all(
        response.data.items.map(async (user) => {
          try {
            const userDetail = await axios.get(user.url, {
              headers: {
                'Accept': 'application/vnd.github.v3+json'
              }
            });
            return userDetail.data;
          } catch (error) {
            console.warn(`Could not fetch details for user ${user.login}:`, error.message);
            return user; // Return basic user info if detailed fetch fails
          }
        })
      );
      
      return {
        ...response.data,
        items: usersWithDetails,
        currentPage: page,
        hasMore: response.data.items.length === 30 // GitHub returns max 30 per page
      };
    }
    
    return {
      ...response.data,
      currentPage: page,
      hasMore: false
    };
    
  } catch (error) {
    if (error.response) {
      switch (error.response.status) {
        case 403:
          throw new Error('API rate limit exceeded. Please try again later.');
        case 422:
          throw new Error('Invalid search query. Please check your search criteria.');
        case 503:
          throw new Error('GitHub API is unavailable. Please try again later.');
        default:
          throw new Error(`GitHub API error: ${error.response.status}`);
      }
    } else if (error.request) {
      throw new Error('Network error: Unable to reach GitHub API');
    } else {
      throw new Error(`Search failed: ${error.message}`);
    }
  }
};

/**
 * Fetch single user details
 */
export const fetchUserData = async (username) => {
  try {
    const response = await axios.get(`/users/${username}`);
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error('User not found');
    }
    throw error;
  }
};