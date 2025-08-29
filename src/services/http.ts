import axios from 'axios';
import { API_URL } from '@/config/environment';

// Create axios instance
const httpClient = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to automatically add auth token
httpClient.interceptors.request.use(
  (config) => {
    const authToken = localStorage.getItem('auth-token');
    
    if (authToken) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${authToken}`,
      };
    }
    
    console.log(`Making request to: ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
httpClient.interceptors.response.use(
  (response) => {
    console.log(`Response from ${response.config.url}:`, response.data);
    return response;
  },
  (error) => {
    console.error('Response error:', error);
    
    // Handle 401 Unauthorized - could trigger logout or token refresh
    if (error.response?.status === 401) {
      console.error('Unauthorized access - token may be expired');
      // You could add logout logic here if needed
    }
    
    // Handle 403 Forbidden
    if (error.response?.status === 403) {
      console.error('Access forbidden');
    }
    
    return Promise.reject(error);
  }
);

export default httpClient; 