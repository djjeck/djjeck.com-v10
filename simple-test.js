// A very simple test script without using Jest
console.log('Starting simple test...');

// A simple assertion function
function expect(value) {
  return {
    toBe: (expected) => {
      if (value === expected) {
        console.log(`✓ Expected ${value} to be ${expected}`);
        return true;
      } else {
        console.error(`✗ Expected ${value} to be ${expected}, but got ${value}`);
        process.exit(1);
      }
    }
  };
}

// Run a simple test
console.log('Running test: 1 + 1 = 2');
expect(1 + 1).toBe(2);

// If we reach here, all tests passed
console.log('All tests passed!');