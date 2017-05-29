const Smooth = require('smooth-discord.js');
const path = require('path');
const { token } = require('./config.json');
const client = new Smooth.Client({
	// eslint-disable-next-line
	owners: ['135991380760592384', '142858948058284032', '135991380760592384', '189696688657530880'],
	prefix: '-',
	commandDirectory: path.join(__dirname, 'commands'),
	debug: true,
	unkownCommandResponse: true,
	errorResponse: true
});

client.login(token);