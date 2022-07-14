module.exports = {
  roots: ['<rootDir>/src'],
  moduleNameMapper: {
    '@data/(.*)$': '<rootDir>/src/data/$1',
    '@infrastructure/(.*)$': '<rootDir>/src/infrastructure/$1',
    '@domain/(.*)$': '<rootDir>/src/domain/$1'
  },
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
}