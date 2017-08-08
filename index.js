const Client = require('./struct/client.js');
const path = require('path');
const { token } = require('./config.json');
const util = require('./util.js');

const client = new Client({
	owners: ['189696688657530880'],
	prefix: '-',
	commandDirectory: path.join(__dirname, 'commands'),
	debug: true,
	errorResponse: true
});

const triggerWords = ['nigger', 'nigga', 'negro'];

client.login(token);

client.once('ready', () => {
	client.user.setGame('5s with the boys!');
	util.updateStreaming(client)
	setInterval(() => util.updateStreaming(client), 300000);
});

client.on('message', message => {
	if (triggerWords.some(word => message.content.toLowerCase().includes(word))) {
		message.delete().then(() => {
			message.member.addRole(message.guild.roles.get('329522736927866880'));
			message.reply('Please do not use racial slurs in discord. Your message has been deleted and you are now muted.');
		});
	}
});

process.on('unhandledRejection', console.error);
