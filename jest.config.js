const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: [
    '<rootDir>/jest.setup.js',
  ],
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
  },
  testPathIgnorePatterns: [
    'node_modules',
    '<rootDir>.*/public',
    '<rootDir>/.next/',
    'cypress',
  ],
  coveragePathIgnorePatterns: [
    '<rootDir>/src/components/detail/RecruitCompleteCanvasConfetti.tsx',
  ],
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
};

module.exports = async () => ({
  ...await createJestConfig(customJestConfig)(),
  transformIgnorePatterns: [
    'node_modules/(?!(@firebase|nanoid|@hookform)/)',
  ],
});
