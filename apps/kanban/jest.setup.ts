/// <reference types="jest" />

import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

// Polyfill for TextEncoder/TextDecoder in Jest environment
Object.assign(global, {
  TextEncoder,
  TextDecoder,
});

// Mock console.warn to suppress expected "Invalid token" warnings in tests
const originalWarn = console.warn;
beforeAll(() => {
  console.warn = jest.fn((message: string, ...args: unknown[]) => {
    // Suppress "Invalid token" warnings in tests
    if (typeof message === 'string' && message.includes('Invalid token')) {
      return;
    }
    originalWarn(message, ...args);
  });
});

afterAll(() => {
  console.warn = originalWarn;
});
