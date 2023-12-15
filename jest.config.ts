import type { Config } from '@jest/types';
const config: Config.InitialOptions = {
  preset: 'react-native',
  testEnvironment: 'node',
  verbose: true,
  automock: true,
  clearMocks: true,
  coverageProvider: 'v8',
  coverageReporters: ['text', 'lcov'],
  collectCoverageFrom: ['src/**/*.tsx'],
  moduleNameMapper: {
    'react-native-gesture-handler': 'react-native-gesture-handler/jestSetup'
  }
};
export default config;
