const { Command } = require('smooth-discord.js');

module.exports = class LockdownCommand extends Command {
	constructor() {
		super({
			name: 'unmute',
			description: 'Lockdown the discord.',
			guildOnly: true,
			aliases: ['unlock']
		});
	}

	run(message) {
		if (message.member.roles.has('322794011133870080') || message.member.roles.has('292271962544275456')) {
			if (message.channel.id === '334258750200217601' || message.channel.id === '334258848523354122' || message.channel.id === '324578223142993931' || message.channel.id === '352089097705095168' || message.channel.id === '354246120819654679') {
				message.channel.overwritePermissions(message.guild.roles.get(message.guild.id), { SEND_MESSAGES: null }).then(() => {
					message.channel.send(`**${message.channel.name}** is now unmuted!`);
				});
			} else {
				message.chanel.send('Only the general chats and LFT chat can be unmuted.');
			}
		}
	}
};
