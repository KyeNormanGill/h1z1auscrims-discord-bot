const { Command } = require('smooth-discord.js');
const snekfetch = require('snekfetch');
const { twitch } = require('../config.json');

module.exports = class StreamingCommand extends Command {
	constructor() {
		super({
			name: 'streaming',
			description: 'Displays who is streaming in this discord.',
			guildOnly: true,
			aliases: ['whosstreaming', 'live', 'streamers']
		});
	}

	run(message, args) {
		let text = `Users streaming in **${message.guild.name}**\n\n`;
		let count = 0;
		let max = 0;

		const users = message.guild.members.filter(member => member.user.presence.game && member.user.presence.game.streaming);
		max = users.size;

		if (users.size === 0) return message.channel.send('No one is streaming right now!');

		users.forEach(mem => {
			const streamID = mem.user.presence.game.url.split('/').slice(3).join();
			const url = `https://api.twitch.tv/kraken/streams/${streamID}?client_id=${twitch}`;
			snekfetch.get(url).then(res => {
				if (!res.body.stream) return;
				text += `**${mem.displayName}** - ${res.body.stream.game} - <${res.body.stream.channel.url}>\n`;
			}).then(() => {
				count++;

				if (count === max) {
					message.channel.send(text);
				}
			});
		});
	}
};
