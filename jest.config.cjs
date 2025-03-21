/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/client/src/$1',
    '^@shared/(.*)$': '<rootDir>/shared/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.cjs'],
  testMatch: [
    '**/client/src/__tests__/**/?(*.)+(spec|test).ts',
    '**/client/src/__tests__/**/?(*.)+(spec|test).js'
  ],
  transform: {
    '^.+\\.(ts|js)$': ['ts-jest', {
      tsconfig: {
        jsx: 'react-jsx',
        esModuleInterop: true,
        module: 'commonjs',
      }
    }]
  },
  transformIgnorePatterns: [
    '/node_modules/(?!.*\\.mjs$)'
  ],
  moduleFileExtensions: ['js', 'ts', 'json', 'node'],
  testTimeout: 15000,
  verbose: true,
};