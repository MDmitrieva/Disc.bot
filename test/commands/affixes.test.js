jest.mock('request');
const affixesCommand = require('./../../commands/affixes');

const botMock = {};
const sendFnMock = jest.fn();
const messageMock = { channel: { send: sendFnMock } };

test('affixes command test run', async () => {
    await affixesCommand.run(botMock, messageMock);
    expect(sendFnMock.mock.calls.length).toBe(1);
    expect(sendFnMock.mock.calls[0][0].embed).toBeDefined();
    expect(sendFnMock.mock.calls[0][0].embed.title).toBe("**Аффиксы на текущее КД:**");
});