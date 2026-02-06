import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Handle API response and redirect to login if unauthorized
 * Returns true if response is OK, false if handled as auth error
 */
export async function handleApiResponse(response: Response): Promise<boolean> {
  if (response.status === 401) {
    // Clear stored auth data
    if (typeof window !== 'undefined') {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      // Redirect to login
      window.location.href = "/login";
    }
    return false;
  }
  return response.ok;
}

/**
 * Wrapper for fetch that automatically handles 401 errors
 */
export async function authFetch(url: string, options?: RequestInit): Promise<Response> {
  const response = await fetch(url, options);

  if (response.status === 401) {
    if (typeof window !== 'undefined') {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
  }

  return response;
}
