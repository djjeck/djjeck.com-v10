// jest.config.mjs
export default {
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { configFile: './babel.config.cjs' }]
  },
  extensionsToTreatAsEsm: ['.jsx', '.ts', '.tsx'],
  // Use a naming pattern for test files that won't be included in production builds
  testMatch: [
    '**/*.spec.ts',
    '**/*.spec.tsx',
    '**/*.test.ts', 
    '**/*.test.tsx',
    '**/test/**/*.js', // Keep original test directory for utility tests
    '**/test/**/*.ts',
    '**/test/**/*.tsx'
  ],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/client/src/$1",
    "^@shared/(.*)$": "<rootDir>/shared/$1",
    "\\.(css|less|scss|sass)$": "<rootDir>/client/src/test-utils/styleMock.js",
  },
  setupFilesAfterEnv: ['<rootDir>/client/src/test-utils/setup.ts'],
  testEnvironment: 'jsdom',
  transformIgnorePatterns: [],
  verbose: true,
  // Prevent tests from being included in production builds
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '.*\\.spec\\.tsx?$',
    '.*\\.test\\.tsx?$'
  ]
};