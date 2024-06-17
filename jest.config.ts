module.exports = {
  preset: 'react-native',
  clearMocks: true,
  restoreMocks: true,
  setupFiles: ['./__tests__/spec/jest.setup.js'],
  coverageProvider: 'v8',
  coverageReporters: ['text', 'lcov'],
  collectCoverageFrom: [
    '**/src/**/*.(ts|tsx|js|jsx)',
    '!**/node_modules/**',
    '!/src/config/**',
    '!**/*.config.js',
    '!**/coverage/**'
  ],
  testRegex: '/__tests__/.*(?:test|spec).(ts|tsx|js)$',
  coverageDirectory: 'coverage'
};
