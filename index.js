const Client = require('./struct/client.js');
const path = require('path');
const { token } = require('./config.json');
const util = require('./util.js');
const db = require('./providers/sqlite.js');

const client = new Client({
	owners: ['189696688657530880'],
	prefix: '-',
	commandDirectory: path.join(__dirname, 'commands'),
	debug: true,
	errorResponse: true
});

client.login(token);

client.once('ready', () => {
	db.sync();
	client.user.setPresence({ game: { name: 'Artful made me :>', type: 0 } });
	util.updateStreaming(client);
	setInterval(() => util.updateStreaming(client), 300000);
});

client.on('message', message => require('./events/message.js').handle(message));

process.on('unhandledRejection', console.error);
