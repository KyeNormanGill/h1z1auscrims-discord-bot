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
			if (message.channel.id === '334258750200217601' || message.channel.id === '334258848523354122' || message.channel.id === '324578223142993931' || message.channel.id === '352089097705095168') {
				message.channel.overwritePermissions(message.guild.roles.get(message.guild.id), { SEND_MESSAGES: false }).then(() => {
					message.channel.send(`**${message.channel.name}** is now muted! Use \`-unmute\` to unmute the chat. `);
				});
			} else {
				message.channel.send('Only the general chats and LFT chat can be muted.');
			}
		}
	}
};
