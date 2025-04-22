import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// API base URL
export const API_URL = 'http://localhost:5000/api';

// API helper functions
export async function fetchApi(endpoint: string, options: RequestInit = {}) {
  const url = `${API_URL}${endpoint}`;
  
  try {
    console.log(`Making ${options.method || 'GET'} request to:`, url);
    if (options.body) {
      console.log('Request body:', options.body);
    }

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...options.headers,
      },
      mode: 'cors',
      ...options,
    });

    // Log response headers and status
    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));

    // Handle non-JSON responses
    const contentType = response.headers.get('content-type');
    let data;
    try {
      data = await response.json();
    } catch (e) {
      data = await response.text();
    }
    
    if (!response.ok) {
      console.error('API Error Response:', data);
      throw new Error(typeof data === 'string' ? data : data.message || `API Error: ${response.statusText}`);
    }

    console.log('API Response:', data);
    return data;
  } catch (error: any) {
    // Network or parsing errors
    const errorMessage = error.message || 'Failed to fetch';
    console.error('API Request Failed:', {
      url,
      method: options.method || 'GET',
      error: errorMessage
    });
    throw new Error(errorMessage);
  }
}
