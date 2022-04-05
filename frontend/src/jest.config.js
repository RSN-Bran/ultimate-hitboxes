module.exports = {
    setupFiles: ['<rootDir>/test/shim.js', '<rootDir>/test/setup.js'],
    moduleNameMapper: {
        "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js",
        "\\.(png|gif|ttf|eot|svg)$": "<rootDir>/__mocks__/fileMock.js"
      },
    moduleFileExtensions: [
        "js",
        "jsx"
      ]
}