module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/node_modules/', '/.next/', '/tests/e2e/'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
}; 