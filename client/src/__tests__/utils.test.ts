/**
 * Basic utility tests that don't rely on React or DOM
 */

import { describe, it, expect } from '@jest/globals';
import { cn } from '../lib/utils';

describe('utils.ts functions', () => {
  describe('cn function', () => {
    it('combines class names correctly', () => {
      // Test basic usage
      expect(cn('class1', 'class2')).toBe('class1 class2');
      
      // Test with conditional classes
      expect(cn('always', { sometimes: true, never: false })).toBe('always sometimes');
      
      // Test with array
      expect(cn('base', ['extra1', 'extra2'])).toBe('base extra1 extra2');
      
      // Test with undefined/null values
      expect(cn('base', undefined, null, 'valid')).toBe('base valid');
    });
  });
});