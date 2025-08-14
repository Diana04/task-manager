export default {
    collectCoverage: true,
    coverageDirectory: 'coverage',
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.tsx?$': ['ts-jest', { tsconfig: 'tsconfig.test.json' }],
    },
    moduleNameMapper: {
        '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
        '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};
