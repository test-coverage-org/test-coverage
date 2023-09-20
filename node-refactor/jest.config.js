const config = {
  moduleFileExtensions: ['js', 'json'],
  testEnvironment: 'node',
  rootDir: './',
  moduleNameMapper: {
    '^@src/(.*)$': '<rootDir>/src/$1',
    '^@db/(.*)$': '<rootDir>/src/db/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@test/(.*)$': '<rootDir>/__test__/$1',
  },
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/db/migrations/**',
    '!src/db/seeders/**',
    '!**/node_modules/**',
    '!**/vendor/**',
  ],
  coverageReporters: [['lcov', { projectRoot: './' }], 'text', 'text-summary'],
};

module.exports = config;
