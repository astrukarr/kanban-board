import {
  generateDummyToken,
  isTokenValid,
  decodeToken,
  getUserFromToken,
  isTokenExpired,
  refreshTokenIfNeeded,
  setToken,
  getToken,
  removeToken,
} from '@/utils/auth';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('JWT Auth Utils (Browser Compatible)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('generateDummyToken', () => {
    it('should generate a valid JWT token', async () => {
      const token = await generateDummyToken();

      expect(token).toBeDefined();
      expect(typeof token).toBe('string');

      // JWT should have 3 parts separated by dots
      const parts = token.split('.');
      expect(parts).toHaveLength(3);
    });

    it('should generate token with correct payload structure', async () => {
      const token = await generateDummyToken();
      const payload = decodeToken(token);

      expect(payload).toHaveProperty('userId', '123');
      expect(payload).toHaveProperty('email', 'john.doe@example.com');
      expect(payload).toHaveProperty('name', 'John Doe');
      expect(payload).toHaveProperty('role', 'user');
      expect(payload).toHaveProperty('iat');
      expect(payload).toHaveProperty('exp');

      // Check that exp is approximately 24 hours after iat
      const iat = payload?.iat as number;
      const exp = payload?.exp as number;
      expect(exp - iat).toBeGreaterThan(23 * 60 * 60); // At least 23 hours
      expect(exp - iat).toBeLessThan(25 * 60 * 60); // At most 25 hours
    });
  });

  describe('decodeToken', () => {
    it('should decode a valid JWT token', async () => {
      const token = await generateDummyToken();
      const payload = decodeToken(token);

      expect(payload).toBeDefined();
      expect(payload).toHaveProperty('userId');
      expect(payload).toHaveProperty('email');
      expect(payload).toHaveProperty('name');
      expect(payload).toHaveProperty('role');
      expect(payload).toHaveProperty('exp');
    });

    it('should return null for invalid token', () => {
      const payload = decodeToken('invalid.token.here');
      expect(payload).toBeNull();
    });
  });

  describe('isTokenValid', () => {
    it('should return true for valid token', async () => {
      const token = await generateDummyToken();
      localStorageMock.getItem.mockReturnValue(token);

      const isValid = await isTokenValid();
      expect(isValid).toBe(true);
    });

    it('should return false when no token exists', async () => {
      localStorageMock.getItem.mockReturnValue(null);

      const isValid = await isTokenValid();
      expect(isValid).toBe(false);
    });

    it('should return false for invalid token', async () => {
      localStorageMock.getItem.mockReturnValue('invalid.token.here');

      const isValid = await isTokenValid();
      expect(isValid).toBe(false);
    });
  });

  describe('getUserFromToken', () => {
    it('should return user info from valid token', async () => {
      const token = await generateDummyToken();
      localStorageMock.getItem.mockReturnValue(token);

      const user = getUserFromToken();

      expect(user).toBeDefined();
      expect(user).toHaveProperty('userId', '123');
      expect(user).toHaveProperty('email', 'john.doe@example.com');
      expect(user).toHaveProperty('name', 'John Doe');
      expect(user).toHaveProperty('role', 'user');
    });

    it('should return null when no token exists', () => {
      localStorageMock.getItem.mockReturnValue(null);

      const user = getUserFromToken();
      expect(user).toBeNull();
    });
  });

  describe('isTokenExpired', () => {
    it('should return false for valid token', async () => {
      const token = await generateDummyToken();

      const isExpired = isTokenExpired(token);
      expect(isExpired).toBe(false);
    });

    it('should return true for invalid token', () => {
      const isExpired = isTokenExpired('invalid.token.here');
      expect(isExpired).toBe(true);
    });
  });

  describe('token management', () => {
    it('should set token in localStorage', async () => {
      const token = await generateDummyToken();

      setToken(token);

      expect(localStorageMock.setItem).toHaveBeenCalledWith('token', token);
    });

    it('should get token from localStorage', () => {
      const token = 'test-token';
      localStorageMock.getItem.mockReturnValue(token);

      const retrievedToken = getToken();

      expect(localStorageMock.getItem).toHaveBeenCalledWith('token');
      expect(retrievedToken).toBe(token);
    });

    it('should remove token from localStorage', () => {
      removeToken();

      expect(localStorageMock.removeItem).toHaveBeenCalledWith('token');
    });
  });

  describe('refreshTokenIfNeeded', () => {
    it('should not refresh token if it has more than 1 hour left', async () => {
      const token = await generateDummyToken();
      localStorageMock.getItem.mockReturnValue(token);

      const refreshed = await refreshTokenIfNeeded();

      expect(refreshed).toBe(false);
    });

    it('should return false when no token exists', async () => {
      localStorageMock.getItem.mockReturnValue(null);

      const refreshed = await refreshTokenIfNeeded();
      expect(refreshed).toBe(false);
    });
  });
});
