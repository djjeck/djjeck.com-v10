# Testing Guide for React Blog

This document provides information about the testing setup and how to run tests for the React Blog project.

## Testing Setup

The project uses Jest for testing, configured with the following:

- **Jest**: Test runner and assertion library
- **@testing-library/react**: For rendering and testing React components
- **@testing-library/jest-dom**: Custom matchers for DOM testing
- **babel-jest**: For transforming JavaScript/TypeScript code for Jest

## Configuration Files

- **jest.config.mjs**: Main Jest configuration file
- **babel.config.cjs**: Babel configuration for Jest
- **client/src/test-utils/setup.ts**: Setup file for testing environment

## Test Organization

Tests are co-located with the components they are testing. This makes it easier to find tests and keep them in sync with component changes.

- Tests follow the naming pattern `ComponentName.test.tsx` or `ComponentName.spec.tsx`
- Test utilities are located in the `client/src/test-utils` directory
- Test files are not included in production builds (configured in Jest)

## Available Tests

### Component Tests

1. **Button Component Test**: Tests the Button component for proper rendering and functionality
   - Verifies text rendering
   - Tests different variants (primary, secondary, etc.)
   - Tests different sizes (default, sm, lg)
   - Tests disabled state

2. **BlogPostCard Component Test**: Tests the BlogPostCard component
   - Verifies post title rendering
   - Tests post excerpt display
   - Checks author name display
   - Validates category name rendering
   - Confirms read time display

3. **Newsletter Component Test**: Simplified test for the Newsletter component
   - Verifies basic rendering of the form

## Running Tests

### Using the Test Script

We've created a convenient script to run all component tests:

```bash
./run-component-tests.sh
```

This script will:
- Run all component tests
- Provide detailed test output
- Show a summary of test results with color-coded pass/fail indicators

### Running Individual Tests

You can also run individual test files:

```bash
# Run with Node ES Modules support
NODE_OPTIONS=--experimental-vm-modules npx jest --config=jest.config.mjs client/src/components/ui/button.test.tsx

# Run with verbose output
NODE_OPTIONS=--experimental-vm-modules npx jest --config=jest.config.mjs client/src/components/BlogPostCard.test.tsx --verbose
```

## Adding New Tests

To add a new test:

1. Create a new test file next to the component being tested with a `.test.tsx` or `.spec.tsx` extension
2. Import the component and testing utilities
3. Write your test cases
4. Add the test file to `run-component-tests.sh` if you want it included in the test script

Example test file structure:

```tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import YourComponent from './YourComponent';

describe('YourComponent', () => {
  it('renders correctly', () => {
    render(<YourComponent />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });
});
```

## Testing Utilities

The project includes several testing utilities:

- **test-utils/setup.ts**: Jest setup file that imports testing library extensions
- **test-utils/styleMock.js**: Mock for CSS imports in tests
- **test-utils/mock-data.ts**: Common mock data for testing components
- **test-utils/test-utils.tsx**: Custom render function with React Query provider

## Troubleshooting

- If you encounter permission issues with the test script, run: `chmod 755 run-component-tests.sh`
- For module resolution errors, check the path imports in your test files
- If tests fail because of TypeScript errors, check that your mock objects match the expected types

For more detailed information about Jest and Testing Library, refer to their official documentation:
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Testing Library Documentation](https://testing-library.com/docs/)