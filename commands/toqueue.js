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

	run(message, args) {
		const teamCaptainRole = message.guild.roles.get('300601294706442241');
		console.log(`Name: ${teamCaptainRole.name}`);
		const queueRoom = message.guild.channels.get('163508200589623298');
		console.log(`Name: ${queueRoom.name}`);
		const membersToMove = message.guild.members.filter(member => member.roles.exists(teamCaptainRole) && member.voiceChannel);
		console.log(membersToMove.map(m => m.name));

		membersToMove.forEach(mem => mem.setVoiceChannel(queueRoom));

		message.reply(stripIndents`
			Moved these users to the queue room.
			
			⊳ ${membersToMove.map(mem => mem.displayName).join('\n⊳ ')}
		`);
	}
};
