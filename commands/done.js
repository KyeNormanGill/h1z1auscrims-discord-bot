const { Command } = require('smooth-discord.js');
const { RichEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');
const { error } = require('../util.js');
const requests = require('../models/request.js');

module.exports = class DoneCommand extends Command {
	constructor() {
		super({
			name: 'done',
			description: 'Doesn\'t matter anyway',
			guildOnly: true,
			aliases: ['complete'],
			ownerOnly: true
		});
	}

	async run(message, args) {
		const request = await requests.findOne({ where: { id: args } });
		if (!request) return error(`No request found with id ${args}`, message);

		await message.guild.members.get(request.userId).send(stripIndents`
			Your request has been completed by **${message.author.username}**
			\`\`\`${request.content}\`\`\`
		`);

		await message.guild.channels.get(request.messageId).delete().catch(console.log);
	}
};
