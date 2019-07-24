const helpCommand = require('./../../commands/help');

const botMock = {};
const sendFnMock = jest.fn();
const messageMock = { channel: { send: sendFnMock } };

test('help command test run', async () => {
    await helpCommand.run(botMock, messageMock);
    expect(sendFnMock.mock.calls.length).toBe(1);
    expect(sendFnMock.mock.calls[0][0].embed).toBeDefined();
});