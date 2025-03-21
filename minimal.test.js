/**
 * Extremely minimal test that doesn't import anything from the project
 */

// Simple adding function to test
function add(a, b) {
  return a + b;
}

test('adds 1 + 2 to equal 3', () => {
  expect(add(1, 2)).toBe(3);
});

test('adds 5 + 7 to equal 12', () => {
  expect(add(5, 7)).toBe(12);
});