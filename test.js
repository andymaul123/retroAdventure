const store = require('./store.js'),
      constants = require('./constants.js'),
      controller = require('./controller.js'),
      helpers = require('./helpers.js');

test('dummy test', () => {
    expect(constants.rim).toBe("roomInMemory");
});