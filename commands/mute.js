const { Command } = require('smooth-discord.js');

module.exports = class LockdownCommand extends Command {
	constructor() {
		super({
			name: 'mute',
			description: 'Lockdown the discord.',
			guildOnly: true,
			aliases: ['lock']
		});
	}

	run(message) {
		if (message.member.roles.has('322794011133870080') || message.member.roles.has('292271962544275456')) {
			message.channel.overwritePermissions(message.guild.roles.get(message.guild.id), { SEND_MESSAGES: false }).then(() => {
				message.channel.send(`**${message.channel.name}** is now muted! Use \`-unmute\` to unmute the chat. `);
			});
		}
	}
};
