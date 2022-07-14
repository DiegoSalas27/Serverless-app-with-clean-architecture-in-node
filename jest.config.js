module.exports = {
  roots: ['<rootDir>/src/api'],
  moduleNameMapper: {
    '@data/(.*)$': '<rootDir>/src/api/data/$1',
    '@infrastructure/(.*)$': '<rootDir>/src/api/infrastructure/$1',
    '@domain/(.*)$': '<rootDir>/src/api/domain/$1',
    '@presentation/(.*)$': '<rootDir>/src/api/presentation/$1',
    '@main/(.*)$': '<rootDir>/src/api/main/$1'
  },
  preset: '@shelf/jest-mongodb',
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
}
