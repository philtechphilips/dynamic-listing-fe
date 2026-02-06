/**
 * Global API utility with automatic 401 handling
 * Use this for all authenticated API calls
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8007/api/v1";

/**
 * Get authentication headers
 */
export function getAuthHeaders(isFormData = false): Record<string, string> {
    const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
    const headers: Record<string, string> = {};

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    if (!isFormData) {
        headers["Content-Type"] = "application/json";
    }

    return headers;
}

/**
 * Handle 401 response - clear auth and redirect to login
 */
function handleUnauthorized(): void {
    if (typeof window !== 'undefined') {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
    }
}

/**
 * Custom fetch wrapper that handles 401 responses automatically
 */
export async function apiFetch(
    endpoint: string,
    options: RequestInit = {}
): Promise<Response> {
    const url = endpoint.startsWith('http') ? endpoint : `${API_URL}${endpoint}`;

    const response = await fetch(url, options);

    if (response.status === 401) {
        handleUnauthorized();
        // Return a mock response to prevent further processing
        return new Response(JSON.stringify({ message: "Unauthorized" }), {
            status: 401,
            headers: { "Content-Type": "application/json" }
        });
    }

    return response;
}

/**
 * GET request with auth
 */
export async function apiGet(endpoint: string): Promise<Response> {
    return apiFetch(endpoint, {
        method: "GET",
        headers: getAuthHeaders(),
    });
}

/**
 * POST request with auth (JSON body)
 */
export async function apiPost(endpoint: string, body: any): Promise<Response> {
    return apiFetch(endpoint, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(body),
    });
}

/**
 * POST request with FormData (for file uploads)
 */
export async function apiPostFormData(endpoint: string, formData: FormData): Promise<Response> {
    return apiFetch(endpoint, {
        method: "POST",
        headers: getAuthHeaders(true),
        body: formData,
    });
}

/**
 * PUT request with auth (JSON body)
 */
export async function apiPut(endpoint: string, body: any): Promise<Response> {
    return apiFetch(endpoint, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(body),
    });
}

/**
 * PUT request with FormData (for file uploads)
 */
export async function apiPutFormData(endpoint: string, formData: FormData): Promise<Response> {
    return apiFetch(endpoint, {
        method: "PUT",
        headers: getAuthHeaders(true),
        body: formData,
    });
}

/**
 * DELETE request with auth
 */
export async function apiDelete(endpoint: string): Promise<Response> {
    return apiFetch(endpoint, {
        method: "DELETE",
        headers: getAuthHeaders(),
    });
}

export { API_URL };
