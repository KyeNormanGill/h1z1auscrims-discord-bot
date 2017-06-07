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

	run(message) {
		const membersToMove = message.guild.members.filter(member => member.voiceChannel);

		if (membersToMove.size === 0) return message.reply('Can\'t find any team members in voice channels.');

		const voiceChannels = message.guild.channels.filter(channel => channel.type === 'voice');

		membersToMove.forEach(mem => {
			const teamRole = mem.roles.filter(role =>
				role.id !== message.member.guild.id
				&& role.id !== '292271962544275456' // Admin role
				&& role.id !== '300601294706442241' // Team Captain role
				&& role.id !== '320464249371492364' // Temp Admin role
				&& role.id !== '320786367510478849' // Guests role
			).first();
			if (!teamRole) return;
			const voiceChannel = voiceChannels.find('name', teamRole.name);
			mem.setVoiceChannel(voiceChannel);
		});

		return message.reply(stripIndents`
			Moving **${membersToMove.size}** to their rooms...
			**This might take up to 20 seconds...**
		`);
	}
};
