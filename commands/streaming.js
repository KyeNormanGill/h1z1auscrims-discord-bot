const { Command } = require('smooth-discord.js');
const snekfetch = require('snekfetch');
const { twitch } = require('../config.json');

module.exports = class StreamingCommand extends Command {
	constructor() {
		super({
			name: 'streaming',
			description: 'Displays who is streaming in this discord.',
			guildOnly: true,
			ownerOnly: true,
			aliases: ['whosstreaming', 'live']
		});
	}

	run(message, args) {
		let text = `User streaming in **${message.guild.name}**\n\n`;
		let count = 1;
		let max = 0;

		message.guild.members.filter(member => member.user.presence.game && member.user.presence.game.streaming).forEach(mem => {
			max = mem.size;
			console.log(`${max} max`);
			console.log(`${count} current`);
			const streamID = mem.user.presence.game.url.split('/').slice(3).join();
			const url = `https://api.twitch.tv/kraken/streams/${streamID}?client_id=${twitch}`;
			snekfetch.get(url).then(res => {
				text += `${mem.displayName} - ${res.body.stream.game} - <${res.body.stream.channel.url}>\n`;
			});
			count++;
			if (count === max) message.channel.send(text);
		});
	}
};
