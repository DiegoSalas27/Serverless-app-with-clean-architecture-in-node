module.exports = {
  roots: ['<rootDir>/src'],
  moduleNameMapper: {
    '@data/(.*)$': '<rootDir>/src/data/$1',
    '@infrastructure/(.*)$': '<rootDir>/src/infrastructure/$1',
    '@domain/(.*)$': '<rootDir>/src/domain/$1',
    '@presentation/(.*)$': '<rootDir>/src/presentation/$1',
    '@main/(.*)$': '<rootDir>/src/main/$1'
  },
  preset: '@shelf/jest-mongodb',
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
}
