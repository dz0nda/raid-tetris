export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@/server/(.*)$': '<rootDir>/src/server/$1',
    '^@/shared/(.*)$': '<rootDir>/src/shared/$1',
    '^@/modules/(.*)$': '<rootDir>/src/server/modules/$1',
  },
  // clearMocks: true,
  restoreMocks: true,
  resetMocks: true,
  coverageProvider: 'v8',
  moduleFileExtensions: ['js', 'ts', 'json', 'node'],
  roots: ['<rootDir>/src/server/modules/http'],
  testMatch: ['**/*.test.ts', '**/*.spec.ts'],
  transform: {
    '^.+\\.(js|ts)$': 'ts-jest',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};
