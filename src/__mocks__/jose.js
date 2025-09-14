// Mock implementation of jose library for Jest tests
export const SignJWT = jest.fn().mockImplementation(() => ({
  setProtectedHeader: jest.fn().mockReturnThis(),
  setIssuedAt: jest.fn().mockReturnThis(),
  setExpirationTime: jest.fn().mockReturnThis(),
  sign: jest
    .fn()
    .mockResolvedValue(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjMiLCJlbWFpbCI6ImpvaG4uZG9lQGV4YW1wbGUuY29tIiwibmFtZSI6IkpvaG4gRG9lIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NTc4ODEyMzAsImV4cCI6MTc1Nzk2NzYzMH0.NR7QfmTJq7BPu9b8DOrd-_Reyaza1vw8aTMKoJAniFk'
    ),
}));

export const jwtVerify = jest.fn().mockImplementation(token => {
  if (token === 'invalid.token.here') {
    throw new Error('Invalid token');
  }
  return Promise.resolve({
    payload: {
      userId: '123',
      email: 'john.doe@example.com',
      name: 'John Doe',
      role: 'user',
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
    },
  });
});

export const decodeJwt = jest.fn().mockImplementation(token => {
  if (token === 'invalid.token.here') {
    return null;
  }
  return {
    userId: '123',
    email: 'john.doe@example.com',
    name: 'John Doe',
    role: 'user',
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
  };
});
