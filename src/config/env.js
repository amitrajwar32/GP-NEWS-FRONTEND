/**
 * Centralized Environment Configuration
 * All environment variables are defined here - change values in .env file
 */

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
export const APP_NAME = import.meta.env.VITE_APP_NAME || 'GN News';
export const IMAGE_PLACEHOLDER_API = import.meta.env.VITE_IMAGE_PLACEHOLDER_API || 'https://picsum.photos';

export default {
  API_URL,
  APP_NAME,
  IMAGE_PLACEHOLDER_API,
};
