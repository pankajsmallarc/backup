const nxPreset = require('@nrwl/jest/preset')
const tsconfig = require('./tsconfig.base.json')

const paths = tsconfig.compilerOptions.paths

const moduleNameMapper = Object.keys(paths).reduce((acc, curr) => {
  return {
    ...acc,
    [curr]: __dirname + '/' + paths[curr],
  }
}, {})
module.exports = {
  ...nxPreset,
  collectCoverage: true,
  testEnvironment: 'jsdom',
  moduleNameMapper,
  testResultsProcessor: 'jest-sonar-reporter',
  reporters: ['default', 'jest-junit'],
  coverageReporters: ['clover', 'json', 'html', 'text', 'lcov', 'cobertura'],
  testMatch: [
    '**/feature/**/*spec.[jt]s?(x)',
    '**/components/mask/*spec.[jt]s?(x)',
    '**/components/navbar/*spec.tsx',
    '**/components/account-title-display/*spec.tsx',
    '**/components/footer/*spec.tsx',
    '**/components/banner/*spec.tsx',
    '**/components/user-inactivity-modal/*spec.tsx',
    '**/components/no-eligible-account/*spec.tsx',
    '**/components/agreements-required/**/*spec.[jt]s?(x)',
    'libs/**/*spec.[jt]s?(x)',
    '**/app.spec.tsx',
  ],
  collectCoverageFrom: [
    'apps/home/src/app/feature/**/*.{ts,tsx}',
    '!apps/home/src/app/components/**',
  ],
  coverageThreshold: {
    global: {
      statements: 90,
      branches: 75,
      functions: 86,
      lines: 90,
    },
  },
}
