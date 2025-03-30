// API configuration utility

// Base API domain from environment variables
const API_DOMAIN = import.meta.env.VITE_PUBLIC_API_DOMAIN || 'http://137.184.13.30:3000';

// GraphQL endpoint
export const GRAPHQL_URL = `${API_DOMAIN}${import.meta.env.VITE_PUBLIC_API_URL || '/graphql'}`;

// Auth endpoint
export const AUTH_URL = `${API_DOMAIN}${import.meta.env.VITE_PUBLIC_AUTH_URL || '/auth'}`;

// Helper for other API endpoints
export const getApiUrl = (path: string): string => {
  // Remove leading slash if present in path
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;
  return `${API_DOMAIN}/${cleanPath}`;
}; 