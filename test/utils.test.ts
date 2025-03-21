import { add, multiply, capitalize } from './utils';

describe('Utility functions', () => {
  describe('add', () => {
    it('should correctly add two numbers', () => {
      expect(add(1, 2)).toBe(3);
      expect(add(-1, 1)).toBe(0);
      expect(add(0, 0)).toBe(0);
    });
  });

  describe('multiply', () => {
    it('should correctly multiply two numbers', () => {
      expect(multiply(2, 3)).toBe(6);
      expect(multiply(-2, 3)).toBe(-6);
      expect(multiply(0, 5)).toBe(0);
    });
  });

  describe('capitalize', () => {
    it('should capitalize the first letter of a string', () => {
      expect(capitalize('hello')).toBe('Hello');
      expect(capitalize('world')).toBe('World');
      expect(capitalize('')).toBe('');
    });
  });
});