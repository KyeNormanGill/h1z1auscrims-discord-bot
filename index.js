const Smooth = require('smooth-discord.js');
const path = require('path');
const { token } = require('./config.json');
const { stripIndents } = require('common-tags');
const moment = require('moment');

const client = new Smooth.Client({
	// eslint-disable-next-line
	owners: ['135991380760592384', '142858948058284032', '135991380760592384', '189696688657530880'],
	prefix: '-',
	commandDirectory: path.join(__dirname, 'commands'),
	debug: true,
	unkownCommandResponse: true,
	errorResponse: true
});

let gameTick = 0;
const notifs = [
	'2tapping cunts',
	'bio bombing 5mans',
	'running man :(',
	'I POINT BLANKED HIM WITH A SHOTTY',
	'and you\'re getting reported',
	'HE\'s IN THE GROUND',
	'Daybreak fix ya games'
];

client.login(token);

client.on('ready', () => {
	setInterval(() => {
		client.user.setGame(notifs[gameTick]);
		if (++gameTick === notifs.length) gameTick = 0;
	}, 300000);
});

client.on('guildMemberAdd', member => {
	client.channels.get('320788665863241728').send(stripIndents`
		:white_check_mark: 
		The user **${member.user.username}** has joined the discord.

		**${moment().format('h:mm a, Do MMMM YYYY')}**
	`);
});

client.on('guildMemberRemove', member => {
	client.channels.get('320788665863241728').send(stripIndents`
		:negative_squared_cross_mark: 
		The user **${member.user.username}** has left the discord.

		**${moment().format('h:mm a, Do MMMM YYYY')}**
	`);
});
