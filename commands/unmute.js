const { Command } = require('smooth-discord.js');
const { findMember } = require('../util.js');
const { RichEmbed } = require('discord.js');
const mutedId = '329522736927866880';

module.exports = class LockdownCommand extends Command {
	constructor() {
		super({
			name: 'unmute',
			description: 'Lockdown the discord.',
			guildOnly: true,
			aliases: ['unlock']
		});
	}

	run(message, args) {
		if (!args) {
			if (message.member.roles.has('322794011133870080') || message.member.roles.has('292271962544275456')) {
				message.channel.overwritePermissions(message.guild.roles.get(message.guild.id), { SEND_MESSAGES: null }).then(() => {
					message.channel.send(`**${message.channel.name}** is now unmuted!`);
				});
			}
		} else {
			const argsArr = args.split(' ');
			const memberToMute = findMember(message, argsArr[0]);

			if (!memberToMute) return message.reply('Could not find a user');

			if (!memberToMute.roles.has(mutedId)) return message.reply(`**${memberToMute.displayName}** is already unmuted!`);

			const embed = new RichEmbed()
				.setColor(0x2dcc58)
				.setDescription(`**User**: ${memberToMute.displayName}\n**Action**: Unmute`)
				.setAuthor(message.member.displayName, message.author.avatarURL)
				.setThumbnail(memberToMute.user.avatarURL)
				.setTimestamp(new Date());

			memberToMute.removeRole(mutedId);
			message.guild.channels.get('387128087705288705').send({ embed });
			message.reply(`User **${memberToMute.displayName}** has been unmuted`);
		}
	}
};
