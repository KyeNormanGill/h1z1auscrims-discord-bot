const { Command } = require('smooth-discord.js');
const { error } = require('../util.js');
const requests = require('../models/request.js');

module.exports = class HelpCommand extends Command {
	constructor() {
		super({
			name: 'help',
			description: 'Doesn\'t matter anyway',
			guildOnly: true,
			aliases: ['request'],
			ownerOnly: true
		});
	}

	async run(message, args) {
		if (!args) return error('Please specify what you want help with');

		message.reply(`**${message.author.username}**, your help request has been added to queue, a moderator will get to it as soon as possible. You will be notified when it's complete!`);

		const logMessage = message.guild.channels.get('351269513737666560').send('test');

		const item = await requests.create({ messageId: logMessage.id, Complete: false, userId: message.author.id });
		console.log(item);
	}
};
