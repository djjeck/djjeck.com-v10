import '@testing-library/jest-dom';

// Fix for Jest in ESM mode
import { jest } from '@jest/globals';

// Mock matchMedia for components that might use media queries
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Setup global mocks needed for tests with ESM
global.jest = jest;