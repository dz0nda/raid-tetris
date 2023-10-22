export default {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-node',
  moduleNameMapper: {
    '^@/server/(.*)$': '<rootDir>/src/server/$1',
    '^@/shared/(.*)$': '<rootDir>/src/shared/$1',
  },
  clearMocks: true,
  coverageProvider: 'v8',
  moduleFileExtensions: ['js', 'ts', 'json', 'node'],
  roots: ['<rootDir>/src/server'],
  testMatch: ['**/*.test.ts', '**/*.spec.ts'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};
