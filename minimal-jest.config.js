module.exports = {
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["@testing-library/jest-dom"],
  moduleNameMapper: {
    "\\.(css|less|scss)$": "identity-obj-proxy"
  },
  testTimeout: 10000
};