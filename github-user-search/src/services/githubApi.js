import axios from 'axios';

const GITHUB_API_URL = import.meta.env.VITE_GITHUB_API_URL || 'https://api.github.com';

const githubApi = axios.create({
  baseURL: GITHUB_API_URL,
  headers: {
    'Accept': 'application/vnd.github.v3+json',
  },
});

// Add authentication if available
if (import.meta.env.VITE_GITHUB_API_KEY) {
  githubApi.defaults.headers.common['Authorization'] = `token ${import.meta.env.VITE_GITHUB_API_KEY}`;
}

export const searchUsers = async (query) => {
  try {
    const response = await githubApi.get(`/search/users?q=${query}&per_page=10`);
    return response.data;
  } catch (error) {
    console.error('Error searching users:', error);
    throw error;
  }
};

export const getUserProfile = async (username) => {
  try {
    const response = await githubApi.get(`/users/${username}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};