const { Command } = require('smooth-discord.js');
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
				});
			}
		} else {
			const argsArr = args.split(' ');
			const reason = argsArr.slice(1).join(' ');
			console.log(argsArr[0]);
			const memberToMute = findMember(message, argsArr[0]);

			if (!memberToMute) return message.reply('Could not find a user');
			memberToMute.addRole(mutedId);
			message.guild.channels.get('387128087705288705').send(`User **${memberToMute.displayName}** has been muted.\nReason: **${reason}**`);
			message.reply(`User **${memberToMute.displayName}** has been muted.\nReason: **${reason}**`);
		}
	}
};
