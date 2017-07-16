const Smooth = require('smooth-discord.js');
const path = require('path');
const { token } = require('./config.json');

const client = new Smooth.Client({
	owners: ['189696688657530880'],
	prefix: '-',
	commandDirectory: path.join(__dirname, 'commands'),
	debug: true,
	errorResponse: true
});

const triggerWords = ['nigger', 'nigga', 'negro'];

client.login(token);

client.on('ready', () => {
	client.user.setGame('5s with the boys!');
});

client.on('message', message => {
	if (triggerWords.some(word => message.content.toLowerCase().includes(word))) {
		message.delete().then(() => {
			message.member.addRole(message.guild.roles.get('329522736927866880'));
			message.reply('Please do not use racial slurs in discord. Your message has been deleted and you are now muted.');
		});
	}
});

client.on('presenceUpdate', (oldM, newM) => require('./events/presenceUpdate.js').handleEvent(oldM, newM));

process.on('unhandledRejection', console.error);
