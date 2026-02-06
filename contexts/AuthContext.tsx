/**
 * =============================================================================
 * AUTHENTICATION CONTEXT
 * =============================================================================
 *
 * This module provides application-wide authentication state management.
 * It handles user sessions, token storage, and auth-related utilities.
 *
 * Usage:
 * 1. Wrap your app with <AuthProvider> in the root layout
 * 2. Use the useAuth() hook in any component to access auth state
 *
 * @module contexts/AuthContext
 */

"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * User object shape stored in auth state.
 */
interface User {
  id: string | number;
  name: string;
  email: string;
  role: "user" | "admin";
  image?: string;
}

/**
 * Shape of the AuthContext value provided to consumers.
 */
interface AuthContextType {
  /** Current authenticated user, or null if not logged in */
  user: User | null;
  /** JWT token for API authentication */
  token: string | null;
  /** True while checking for existing session on mount */
  isLoading: boolean;
  /** True if user is authenticated */
  isAuthenticated: boolean;
  /** True if user has admin role */
  isAdmin: boolean;
  /** Function to log in a user */
  login: (token: string, user?: User) => void;
  /** Function to log out the current user */
  logout: () => void;
}

// ============================================================================
// CONTEXT
// ============================================================================

/** The React context for authentication state */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ============================================================================
// PROVIDER COMPONENT
// ============================================================================

/**
 * Authentication Provider Component
 *
 * Wraps the application to provide auth state to all child components.
 * Handles:
 * - Restoring session from localStorage on mount
 * - Login/logout functionality
 * - Token and user state management
 *
 * @param {ReactNode} children - Child components to wrap
 *
 * @example
 * // In your root layout
 * <AuthProvider>
 *   <App />
 * </AuthProvider>
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  // State for authenticated user and token
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  /**
   * On mount, check for existing session in localStorage.
   * This allows the user to stay logged in across page refreshes.
   */
  useEffect(() => {
    // Check for existing token on mount
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
      } catch (e) {
        // Invalid stored user, clear storage
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }
    setIsLoading(false);
  }, []);

  /**
   * Log in a user by storing their token and user data.
   *
   * @param {string} newToken - JWT token from the server
   * @param {User} [userData] - Optional user object to store
   */
  const login = (newToken: string, userData?: User) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    if (userData) {
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
    }
  };

  /**
   * Log out the current user.
   * Clears localStorage and redirects to login page.
   */
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken(null);
    router.push("/login");
  };

  // Build the context value object
  const value: AuthContextType = {
    user,
    token,
    isLoading,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// ============================================================================
// HOOK
// ============================================================================

/**
 * Custom hook to access authentication context.
 * Must be used within an AuthProvider.
 *
 * @returns {AuthContextType} The authentication context value
 * @throws {Error} If used outside of AuthProvider
 *
 * @example
 * function MyComponent() {
 *   const { user, isAuthenticated, logout } = useAuth();
 *
 *   if (!isAuthenticated) {
 *     return <p>Please log in</p>;
 *   }
 *
 *   return (
 *     <div>
 *       <p>Hello, {user?.name}!</p>
 *       <button onClick={logout}>Logout</button>
 *     </div>
 *   );
 * }
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
