const { Command } = require('smooth-discord.js');
const { RichEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');
const { error } = require('../util.js');
const requests = require('../models/request.js');

module.exports = class HelpCommand extends Command {
	constructor() {
		super({
			name: 'help',
			description: 'Doesn\'t matter anyway',
			guildOnly: true,
			aliases: ['request']
		});
	}

	async run(message, args) {
		if (!args) return error('Please specify what you want help with', message);
		await message.delete();
		await message.reply(`**${message.author.username}**, your help request has been added to queue, a moderator will get to it as soon as possible. You will be notified when it's complete!`);

		const embed = new RichEmbed()
			.setColor(0xe15a2c);

		const logMessage = await message.guild.channels.get('351269513737666560').send({ embed });

		const item = await requests.create({ messageId: logMessage.id, content: args, userId: message.author.id });

		embed.setDescription(stripIndents`
			**User**: ${message.author.username}
			**Request**: ${args}

			Moderators use \`-done ${item.id}\` to complete this task.
		`);

		await logMessage.edit({ embed });
	}
};
