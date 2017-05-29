const { Command } = require('smooth-discord.js');
const { stripIndents } = require('common-tags');

module.exports = class RoomCommand extends Command {
	constructor() {
		super({
			name: 'toroom',
			description: 'Moves all users with the "Team Captains" role back to their team chats.',
			guildOnly: true,
			ownerOnly: true
		});
	}

	run(message, args) {
		const teamCaptainRole = message.guild.roles.get('300601294706442241');
		const queueRoom = message.guild.channels.get('163508200589623298');
		const adminRole = message.guild.roles.get('292271962544275456');
		const membersToMove = queueRoom.members.filter(member => member.roles.has(teamCaptainRole.id));
		const voiceChannels = message.guild.channels.filter(channel => channel.type === 'voice');

		membersToMove.forEach(mem => {
			const teamRole = mem.roles.filter(role => role !== adminRole && role.id !== message.member.guild.id).first();
			const voiceChannel = voiceChannels.find('name', teamRole.name);
			mem.setVoiceChannel(voiceChannel);
		});

		message.reply(stripIndents`
			Moved these users back to their team rooms.
			
			⊳ ${membersToMove.map(mem => mem.displayName).join('\n⊳ ')}`);
	}
};
