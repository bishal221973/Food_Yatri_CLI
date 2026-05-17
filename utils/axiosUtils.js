import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create an Axios instance
const api = axios.create({
  baseURL: 'http://192.168.1.82:8000/api', // Replace with your API base URL
//   baseURL: 'https://foodyatri.com.np/api', // Replace with your API base URL
  timeout: 10000, // 10 seconds timeout
  // headers: {
  //   'Content-Type': 'application/json',
  // },
});

// Request interceptor to add auth token if available
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('token'); // Token stored in AsyncStorage
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    } catch (error) {
      console.error('Error retrieving token', error);
      return config;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle global errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with status code outside 2xx
      console.error('API error:', error.response.data);
    } else if (error.request) {
      // No response received
      console.error('No response from server:', error.request);
    } else {
      // Something else
      console.error('Axios error:', error.message);
    }
    return Promise.reject(error);
  }
);

// Helper functions for requests (optional, for cleaner calls)
export const get = async (url, params = {}) => {
  return api.get(url, { params });
};

export const post = async (url, data = {}) => {
  const config = {};

  // If sending FormData, do NOT set Content-Type manually
  if (data instanceof FormData) {
    config.headers = {
      Accept: 'application/json', // Optional, server-friendly
      // 'Content-Type' is deliberately left out for Axios to set the boundary
    };
  }

  return api.post(url, data, config);
};

export const put = async (url, data = {}) => {
  return api.put(url, data);
};

export const del = async (url) => {
  return api.delete(url);
};

// Export the Axios instance if needed for custom requests
export default api;