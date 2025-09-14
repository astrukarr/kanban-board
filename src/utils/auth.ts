// Utility functions for JWT token management
import { SignJWT, jwtVerify, decodeJwt } from 'jose';

// Secret key for JWT signing (in production, this should be in environment variables)
const JWT_SECRET = new TextEncoder().encode(
  process.env.NEXT_PUBLIC_JWT_SECRET || 'your-secret-key-change-in-production'
);

/**
 * Generate a real JWT token for authentication
 * In production, this would come from your authentication server
 */
export async function generateDummyToken(): Promise<string> {
  const payload = {
    userId: '123',
    email: 'john.doe@example.com',
    name: 'John Doe',
    role: 'user',
  };

  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(JWT_SECRET);
}

/**
 * Check if token exists and is valid
 */
export async function isTokenValid(): Promise<boolean> {
  const token = localStorage.getItem('token');
  if (!token) return false;

  try {
    // Verify the token signature and check expiration
    await jwtVerify(token, JWT_SECRET);
    return true;
  } catch (error) {
    // Token is invalid or expired
    console.warn('Invalid token:', error);
    return false;
  }
}

/**
 * Decode JWT token payload (without verification)
 * Use this for reading token data in the client
 */
export function decodeToken(token: string): Record<string, unknown> | null {
  try {
    return decodeJwt(token) as Record<string, unknown>;
  } catch (error) {
    console.warn('Failed to decode token:', error);
    return null;
  }
}

/**
 * Get user info from token
 */
export function getUserFromToken(): {
  userId: string;
  email: string;
  name: string;
  role: string;
} | null {
  const token = getToken();
  if (!token) return null;

  const payload = decodeToken(token);
  if (!payload) return null;

  return {
    userId: payload.userId as string,
    email: payload.email as string,
    name: payload.name as string,
    role: payload.role as string,
  };
}

/**
 * Set token in localStorage
 */
export function setToken(token: string): void {
  localStorage.setItem('token', token);
}

/**
 * Remove token from localStorage
 */
export function removeToken(): void {
  localStorage.removeItem('token');
}

/**
 * Get token from localStorage
 */
export function getToken(): string | null {
  return localStorage.getItem('token');
}

/**
 * Check if token is expired (without verification)
 */
export function isTokenExpired(token: string): boolean {
  try {
    const payload = decodeToken(token);
    if (!payload || !payload.exp) return true;

    const now = Math.floor(Date.now() / 1000);
    return (payload.exp as number) < now;
  } catch {
    return true;
  }
}

/**
 * Refresh token if it's close to expiration
 * In production, this would call your refresh endpoint
 */
export async function refreshTokenIfNeeded(): Promise<boolean> {
  const token = getToken();
  if (!token) return false;

  try {
    const payload = decodeToken(token);
    if (!payload || !payload.exp) return false;

    const now = Math.floor(Date.now() / 1000);
    const timeUntilExpiry = (payload.exp as number) - now;

    // Refresh if token expires in less than 1 hour
    if (timeUntilExpiry < 3600) {
      const newToken = await generateDummyToken();
      setToken(newToken);
      return true;
    }

    return false;
  } catch {
    return false;
  }
}

/**
 * Logout user by removing token and redirecting
 */
export function logout(): void {
  removeToken();
  window.location.href = '/login?message=Logged out successfully';
}
