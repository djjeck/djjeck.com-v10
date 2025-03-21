// Import testing libraries
import { describe, it, expect } from '@jest/globals';

// Basic test that doesn't rely on React or DOM
describe('Simple Math Test', () => {
  it('adds 1 + 2 to equal 3', () => {
    expect(1 + 2).toBe(3);
  });

  it('multiplies 4 * 5 to equal 20', () => {
    expect(4 * 5).toBe(20);
  });
});