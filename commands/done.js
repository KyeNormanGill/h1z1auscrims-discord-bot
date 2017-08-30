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
			aliases: ['complete']
		});
	}

	async run(message, args) {
		if (!message.member.roles.has('322794011133870080')) return error('Only moderators can use this!', message);

		const request = await requests.findOne({ where: { id: args } });
		if (!request) return error(`No request found with id ${args}`, message);

		await message.guild.members.get(request.userId).send(stripIndents`
			Your request has been completed by **${message.author.username}**
			\`\`\`${request.content}\`\`\`
		`);

		const logMessage = await message.guild.channels.get('351269513737666560').fetchMessage(request.messageId);

		if (!logMessage) return message.reply('No request message was found. It must\'ve been deleted!');

		const embed = new RichEmbed()
			.setDescription(stripIndents`
				**User**: ${message.client.users.get(request.userId)}
				**Request**: ${request.content}
				**Status**: Complete
			`)
			.setColor(0x4fdd24);

		await logMessage.edit({ embed }).catch(console.log);
		await message.delete();
		await message.reply(`Completed task: ${request.id}`);
	}
};
