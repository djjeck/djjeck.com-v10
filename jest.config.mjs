// jest.config.mjs
export default {
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { configFile: './babel.config.cjs' }]
  },
  extensionsToTreatAsEsm: ['.jsx', '.ts', '.tsx'],
  testMatch: ['**/test/**/*.js', '**/test/**/*.ts', '**/test/**/*.tsx'],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/client/src/$1",
    "^@shared/(.*)$": "<rootDir>/shared/$1",
    "\\.(css|less|scss|sass)$": "<rootDir>/test/mocks/styleMock.js",
  },
  setupFilesAfterEnv: ['<rootDir>/test/setup.ts'],
  testEnvironment: 'jsdom',
  transformIgnorePatterns: [],
  verbose: true
};