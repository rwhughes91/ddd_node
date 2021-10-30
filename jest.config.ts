import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  roots: ['<rootDir>/tests'],
  moduleDirectories: ['node_modules', '<rootDir>'],
  modulePathIgnorePatterns: ['<rootDir>/tests/integration'],
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  testRegex: 'test.ts',
  setupFiles: ['./jest.setup.js'],
  moduleNameMapper: {
    '^@models$': '<rootDir>/src/models/index',
    '^@models/(.*)$': '<rootDir>/src/models/$1',
  },
};
export default config;
