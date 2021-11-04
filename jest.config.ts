import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  roots: ['<rootDir>/tests'],
  moduleDirectories: ['node_modules', '<rootDir>'],
  modulePathIgnorePatterns: [],
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  testRegex: 'test.ts',
  setupFiles: [],
  moduleNameMapper: {
    '^@adapters/(.*)$': '<rootDir>/src/adapters/$1',
    '^@app/(.*)$': '<rootDir>/src/app/$1',
    '^@domain/(.*)$': '<rootDir>/src/domain/$1',
  },
};
export default config;
