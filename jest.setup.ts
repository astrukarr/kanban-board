/// <reference types="jest" />

import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

// Polyfill for TextEncoder/TextDecoder in Jest environment
Object.assign(global, {
  TextEncoder,
  TextDecoder,
});
