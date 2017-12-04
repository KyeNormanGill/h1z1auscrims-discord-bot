const { Command } = require('smooth-discord.js');
const { RichEmbed } = require('discord.js');
const { findMember } = require('../util.js');
const mutedId = '329522736927866880';

module.exports = class LockdownCommand extends Command {
	constructor() {
		super({
			name: 'mute',
			description: 'Lockdown the discord.',
			guildOnly: true,
			aliases: ['lock']
		});
	}

	run(message, args) {
		if (!args) {
			if (message.member.roles.has('322794011133870080') || message.member.roles.has('292271962544275456')) {
				message.channel.overwritePermissions(message.guild.roles.get(message.guild.id), { SEND_MESSAGES: false }).then(() => {
					message.channel.send(`**${message.channel.name}** is now muted! Use \`-unmute\` to unmute the chat. `);
		
					const embed = new RichEmbed()
						.setColor(0x3689c7)
						.setDescription(`**Channel**: ${message.channel.name}\n**Action**: Channel mute`)
						.setAuthor(message.member.displayName, message.author.avatarURL)
						.setTimestamp(new Date());

					message.guild.channels.get('387128087705288705').send({ embed });
				});
			}
		} else {
			const argsArr = args.split(' ');
			const reason = argsArr.slice(1).join(' ');
			const memberToMute = findMember(message, argsArr[0]);

			if (!memberToMute) return message.reply('Could not find a user');

			if (memberToMute.roles.has(mutedId)) return message.reply(`**${memberToMute.displayName}** is already muted!`);

			const embed = new RichEmbed()
				.setColor(0xd64949)
				.setDescription(`**User**: ${memberToMute.displayName}\n**Action**: Mute\n**Reason**: ${reason || 'Unspecified'}`)
				.setAuthor(message.member.displayName, message.author.avatarURL)
				.setThumbnail(memberToMute.user.avatarURL)
				.setTimestamp(new Date());

			memberToMute.addRole(mutedId);
			message.guild.channels.get('387128087705288705').send({ embed });
			message.reply(`User **${memberToMute.displayName}** has been muted.<#387128087705288705>`);
		}
	}
};
