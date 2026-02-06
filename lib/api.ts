/**
 * =============================================================================
 * GLOBAL API UTILITY
 * =============================================================================
 * 
 * This module provides a centralized API fetching mechanism with automatic
 * handling of 401 (Unauthorized) responses. When a 401 is detected, it:
 * 1. Clears authentication tokens from localStorage
 * 2. Redirects the user to the login page
 * 
 * USE THIS FOR ALL AUTHENTICATED API CALLS to ensure consistent error handling.
 * 
 * @module lib/api
 */

/** Base API URL from environment or fallback to localhost */
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8007/api/v1";

/**
 * Generates authentication headers for API requests.
 * 
 * @param {boolean} isFormData - If true, omits Content-Type header (browser sets it for FormData)
 * @returns {Record<string, string>} Headers object with Authorization and optionally Content-Type
 * 
 * @example
 * // For JSON requests
 * const headers = getAuthHeaders();
 * // Returns: { Authorization: "Bearer <token>", "Content-Type": "application/json" }
 * 
 * @example
 * // For file uploads (FormData)
 * const headers = getAuthHeaders(true);
 * // Returns: { Authorization: "Bearer <token>" }
 */
export function getAuthHeaders(isFormData = false): Record<string, string> {
    // Only access localStorage in browser environment (not during SSR)
    const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
    const headers: Record<string, string> = {};

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    // Don't set Content-Type for FormData - browser handles multipart boundary
    if (!isFormData) {
        headers["Content-Type"] = "application/json";
    }

    return headers;
}

/**
 * Handles 401 Unauthorized responses by clearing auth state and redirecting to login.
 * This is called automatically by apiFetch when a 401 response is detected.
 * 
 * @private
 */
function handleUnauthorized(): void {
    if (typeof window !== 'undefined') {
        // Clear all authentication data
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        // Redirect to login page
        window.location.href = "/login";
    }
}

/**
 * Custom fetch wrapper with automatic 401 handling.
 * 
 * This is the core function that wraps the native fetch API. It intercepts
 * 401 responses and handles them by clearing auth state and redirecting to login.
 * 
 * @param {string} endpoint - API endpoint (relative like "/users" or absolute URL)
 * @param {RequestInit} options - Standard fetch options (method, headers, body, etc.)
 * @returns {Promise<Response>} The fetch Response object
 * 
 * @example
 * // Basic GET request
 * const response = await apiFetch('/admin/users', {
 *   headers: getAuthHeaders()
 * });
 * 
 * @example
 * // POST request with JSON body
 * const response = await apiFetch('/admin/users', {
 *   method: 'POST',
 *   headers: getAuthHeaders(),
 *   body: JSON.stringify({ name: 'John', email: 'john@example.com' })
 * });
 */
export async function apiFetch(
    endpoint: string,
    options: RequestInit = {}
): Promise<Response> {
    // Support both relative and absolute URLs
    const url = endpoint.startsWith('http') ? endpoint : `${API_URL}${endpoint}`;

    const response = await fetch(url, options);

    // Handle 401 Unauthorized - token expired or invalid
    if (response.status === 401) {
        handleUnauthorized();
        // Return a mock response to prevent further processing in calling code
        return new Response(JSON.stringify({ message: "Unauthorized" }), {
            status: 401,
            headers: { "Content-Type": "application/json" }
        });
    }

    return response;
}

/**
 * Convenience method for GET requests with authentication.
 * 
 * @param {string} endpoint - API endpoint
 * @returns {Promise<Response>} The fetch Response object
 * 
 * @example
 * const response = await apiGet('/admin/dashboard-stats');
 * const data = await response.json();
 */
export async function apiGet(endpoint: string): Promise<Response> {
    return apiFetch(endpoint, {
        method: "GET",
        headers: getAuthHeaders(),
    });
}

/**
 * Convenience method for POST requests with JSON body.
 * 
 * @param {string} endpoint - API endpoint
 * @param {any} body - Request body (will be JSON stringified)
 * @returns {Promise<Response>} The fetch Response object
 * 
 * @example
 * const response = await apiPost('/admin/categories', { name: 'New Category' });
 */
export async function apiPost(endpoint: string, body: any): Promise<Response> {
    return apiFetch(endpoint, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(body),
    });
}

/**
 * Convenience method for POST requests with FormData (file uploads).
 * 
 * @param {string} endpoint - API endpoint
 * @param {FormData} formData - FormData object containing files/data
 * @returns {Promise<Response>} The fetch Response object
 * 
 * @example
 * const formData = new FormData();
 * formData.append('image', file);
 * const response = await apiPostFormData('/upload', formData);
 */
export async function apiPostFormData(endpoint: string, formData: FormData): Promise<Response> {
    return apiFetch(endpoint, {
        method: "POST",
        headers: getAuthHeaders(true), // Don't set Content-Type for FormData
        body: formData,
    });
}

/**
 * Convenience method for PUT requests with JSON body.
 * 
 * @param {string} endpoint - API endpoint
 * @param {any} body - Request body (will be JSON stringified)
 * @returns {Promise<Response>} The fetch Response object
 * 
 * @example
 * const response = await apiPut('/admin/users/123', { name: 'Updated Name' });
 */
export async function apiPut(endpoint: string, body: any): Promise<Response> {
    return apiFetch(endpoint, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(body),
    });
}

/**
 * Convenience method for PUT requests with FormData (file uploads).
 * 
 * @param {string} endpoint - API endpoint
 * @param {FormData} formData - FormData object containing files/data
 * @returns {Promise<Response>} The fetch Response object
 */
export async function apiPutFormData(endpoint: string, formData: FormData): Promise<Response> {
    return apiFetch(endpoint, {
        method: "PUT",
        headers: getAuthHeaders(true), // Don't set Content-Type for FormData
        body: formData,
    });
}

/**
 * Convenience method for DELETE requests with authentication.
 * 
 * @param {string} endpoint - API endpoint
 * @returns {Promise<Response>} The fetch Response object
 * 
 * @example
 * const response = await apiDelete('/admin/users/123');
 */
export async function apiDelete(endpoint: string): Promise<Response> {
    return apiFetch(endpoint, {
        method: "DELETE",
        headers: getAuthHeaders(),
    });
}

/** Export the base API URL for use in other modules if needed */
export { API_URL };

