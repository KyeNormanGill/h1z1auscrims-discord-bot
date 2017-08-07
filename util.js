const Discord = require('discord.js');
const snekfetch = require('snekfetch');
const { twitch } = require('./config.json');

function findUser(message, args) {
	return message.mentions.users.first()
		|| message.client.users.get(args)
		|| message.client.users.find(userino => userino.username.toLowerCase().includes(args.toLowerCase()));
}

function findMember(message, args) {
	return message.guild.members.get(findUser(message, args).id);
}

function error(errorText, message) {
	const embed = new Discord.RichEmbed();
	embed.setColor(0xee3737)
		.setDescription(`:x: ${errorText}`);
	message.channel.send({ embed });
}

function updateStreaming(client) {
	const channel = client.guilds.get('163508085497790467').channels.get('343979578089406474');
	const div1RoleId = '329312590390099971';
	const div2RoleId = '329312398198702080';
	let message;
	channel.fetchMessage('343991659261984770').then(m => message = m);

	let div1 = '__No one streaming in **Division 1**__\n\n';
	let div1Multi = '';
	let div2 = '__No one streaming in **Division 2**__';
	let div2Multi = '';
	let other = '__No one streaming in **Other**__';

	const streaming = message.guild.members.filter(member => member.user.presence.game && member.user.presence.game.streaming);

	streaming.forEach(mem => {	
		const streamID = mem.user.presence.game.url.split('/').slice(3).join();
		const url = `https://api.twitch.tv/kraken/streams/${streamID}?client_id=${twitch}`;

		snekfetch.get(url).then(res => {
			if (!res.body.stream) return;
			if (res.body.stream.game !== 'H1Z1: King of the Kill') return;

			if (mem.roles.has(div1RoleId)) {
				if (div1.startsWith('__**Division 1 streamers**__')) {
					div1 += `**${mem.displayName}** - <${res.body.stream.channel.url}>\n`;
				} else {
					div1 = `__**Division 1 streamers**__\n\n**${mem.displayName}** - <${res.body.stream.channel.url}>\n`;
				}
			} else
			if (mem.roles.has(div2RoleId)) {
				if (div2.startsWith('__**Division 2 streamers**__')) {
					div2 += `**${mem.displayName}** - <${res.body.stream.channel.url}>\n`;
				} else {
					div2 = `__**Division 2 streamers**__\n\n**${mem.displayName}** - <${res.body.stream.channel.url}>\n`;
				}
			} else {
				if (other.startsWith('__**Other streamers**__')) {
					other += `**${mem.displayName}** - <${res.body.stream.channel.url}>\n`;
				} else {
					other = `__**Other streamers**__\n\n**${mem.displayName}** - <${res.body.stream.channel.url}>\n`;
				}
			}

			message.edit(`${div1}${div2}${other}`).catch(console.error);
		});


	});
}

exports.findUser = findUser;
exports.findMember = findMember;
exports.error = error;
exports.updateStreaming = updateStreaming;
