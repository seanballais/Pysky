const fs       = require('fs');
const restify  = require('restify');
const skype    = require('skype-sdk');

// You have to create your own keys.js file
// that contains the app id and secret.
const app_keys = require('./keys');
const botService = new skype.BotService({
    messaging: {
        botId          : '28:"pysky"',
        serverUrl      : 'https://apis.skype.com',
        requestTimeout : 15000,
        appId          : app_keys.APP_ID,
        appSecret      : app_keys.APP_SECRET
    }
});

botService.on('contactAdded', (bot, data) => {
    bot.reply('Hello ${data.fromDisplayName}!', true);
});

botService.on('personalMessage', (bot, data) => {
    bot.reply('Yo nigga ${data.from}.', true);
});

const server = restify.createServer();
server.use(skype.ensureHttps(true));
server.use(skype.verifySkypeCert());
server.post('/v1/chat', skype.messagingHandler(botService));
const port = process.env.PORT || 8080;
server.listen(port);
console.log('Listening for incoming requests on port ' + port);
