/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  // for RTL tests where components import scss files
  moduleNameMapper: {
    '^.+\\.(css|less|scss)$': 'babel-jest'
  }
};
