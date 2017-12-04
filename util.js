const { RichEmbed } = require('discord.js');
const snekfetch = require('snekfetch');
const { twitch } = require('./config.json');

function findUser(message, args) {
	return message.mentions.users.first()
		|| message.client.users.get(args)
		|| message.client.users.find(userino => userino.username.toLowerCase().includes(args.toLowerCase()));
}

function findMember(message, args) {
	const user = findUser(message, args);
	if (!user) return null;
	return message.guild.members.get(user.id);
}

function error(errorText, message) {
	const embed = new RichEmbed();
	embed.setColor(0xee3737)
		.setDescription(`:x: ${errorText}`);
	message.channel.send({ embed });
}

async function updateStreaming(client) {
	const liveChannel = client.guilds.get('163508085497790467').channels.get('343979578089406474');

	const gARoleId = '375126184859795467';
	const gBRoleId = '375126417543004161';
	const oGRoleId = '352088277324398592';

	const streamMessage = await liveChannel.fetchMessage('343991659261984770');

	const streamEmbed = new RichEmbed().setColor(0x6441A4).setTitle('__**Players streaming H1Z1**__');

	let groupA = '__**Group A** Streamers__\n';
	let groupB = '__**Group B** Streamers__\n';
	let openG = '__**Open Group** Streamers__\n';

	const streaming = liveChannel.guild.members.filter(member => member.user.presence.game && member.user.presence.game.streaming);

	for (const member of streaming.values()) {
		const streamID = member.user.presence.game.url.split('/').slice(3).join();
		const url = `https://api.twitch.tv/kraken/streams/${streamID}?client_id=${twitch}`;

		const { body } = await snekfetch.get(url).catch(console.error); // eslint-disable-line no-await-in-loop

		if (!body.stream) return;
		if (body.stream.game !== 'H1Z1') return;

		if (member.roles.has(gARoleId)) {
			groupA += `**${member.displayName}** - <${body.stream.channel.url}>\n`;
		} else if (member.roles.has(gBRoleId)) {
			groupB += `**${member.displayName}** - <${body.stream.channel.url}>\n`;
		} else if (member.roles.has(oGRoleId)) {
			openG += `**${member.displayName}** - <${body.stream.channel.url}>\n`;
		}
	}

	streamEmbed.setDescription(`${groupA}\n${groupB}\n${openG}`);

	await streamMessage.edit({ embed: streamEmbed }).catch(console.error);
}

exports.findUser = findUser;
exports.findMember = findMember;
exports.error = error;
exports.updateStreaming = updateStreaming;
