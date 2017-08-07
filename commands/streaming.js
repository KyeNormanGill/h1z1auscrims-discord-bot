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
		let text = `Users streaming **H1Z1: KOTK** in **${message.guild.name}**\n\n`;
		let count = 0;
		let max = 0;
		let names = [];

		const users = message.guild.members.filter(member => member.user.presence.game && member.user.presence.game.streaming);
		max = users.size;

		if (users.size === 0) return message.channel.send('No one is streaming H1Z1 right now!');

		users.forEach(mem => {
			const streamID = mem.user.presence.game.url.split('/').slice(3).join();
			const url = `https://api.twitch.tv/kraken/streams/${streamID}?client_id=${twitch}`;
			snekfetch.get(url).then(res => {
				if (!res.body.stream) return;
				if (res.body.stream.game !== 'H1Z1: King of the Kill') return;
				names.push(`${streamID}/`);

				text += `**${mem.displayName}** - <${res.body.stream.channel.url}>\n`;
			}).then(() => {
				count++;

				if (count === max) {
					if (names.length > 1) {
						console.log(`${names.length} is greater than 1`);
						snekfetch.get(`http://tinyurl.com/api-create.php?url=http://multitwitch.tv/${names.join('')}`)
							.then(res => {
								text += `\nWatch them all at: ${res.text}`;
								console.log(res.text);
								message.channel.send(text);
							});
					} else {
						message.channel.send(text);
					}
				}
			});
		});
	}
};
