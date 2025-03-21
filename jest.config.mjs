// jest.config.mjs
export default {
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { configFile: './babel.config.cjs' }]
  },
  extensionsToTreatAsEsm: ['.jsx', '.ts', '.tsx'],
  testMatch: ['**/test/**/*.js', '**/test/**/*.ts'],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/client/src/$1",
    "^@shared/(.*)$": "<rootDir>/shared/$1"
  },
  testEnvironment: 'node',
  transformIgnorePatterns: [],
  verbose: true
};