const { Command } = require('smooth-discord.js');
const { stripIndents } = require('common-tags');

module.exports = class QueueCommand extends Command {
	constructor() {
		super({
			name: 'toqueue',
			description: 'Moves all users with the "Team Captains" role to the queue room.',
			guildOnly: true,
			ownerOnly: true
		});
	}

	run(message) {
		const teamCaptainRole = message.guild.roles.get('300601294706442241');
		const queueRoom = message.guild.channels.get('163508200589623298');
		const membersToMove = message.guild.members.filter(member => member.roles.has(teamCaptainRole.id) && member.voiceChannel);

		if (membersToMove.size === 0) return message.reply('There are no Team captains currently in a voice channel!');

		membersToMove.forEach(mem => mem.setVoiceChannel(queueRoom));

		return message.reply(stripIndents`
			Moved these users to the queue room.
			
			⊳ ${membersToMove.map(mem => mem.displayName).join('\n⊳ ')}
		`);
	}
};
