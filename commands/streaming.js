const { Command } = require('smooth-discord.js');
const snekfetch = require('snekfetch');
const { twitch } = require('../config.json');

module.exports = class StreamingCommand extends Command {
	constructor() {
		super({
			name: 'streaming',
			description: 'Displays who is streaming in this discord.',
			guildOnly: true,
			aliases: ['whosstreaming', 'live', 'streamers']
		});
	}

	run(message, args) {
		message.channel.send(`Check out: ${message.guild.channels.get('343979578089406474')}`);
	}
};
