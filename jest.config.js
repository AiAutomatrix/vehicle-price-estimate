module.exports = {
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^./styles/GlobalStyles$': '<rootDir>/src/styles/__mocks__/GlobalStyles.js',
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { configFile: './babel.config.js' }],
  },
  globals: {
    __FUTURE_V7_START_TRANSITION__: true,
    __FUTURE_V7_RELATIVE_SPLAT_PATH__: true,
  },
};