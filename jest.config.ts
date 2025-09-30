import type { Config } from 'jest';

const config: Config = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  moduleNameMapper: {
    // Handle CSS imports (if you use CSS modules or global CSS)
    '^.+\\.(css|less|scss|sass)$': 'identity-obj-proxy',

    // Handle path aliases from tsconfig.json
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
};

export default config;
