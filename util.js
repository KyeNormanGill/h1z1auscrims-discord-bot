const { RichEmbed } = require('discord.js');
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

	const streamEmbed = new RichEmbed();

	const streamDescription = '**Players streaming H1Z1**\n\n';

	const groupA = '';

	const groupB = '';

	const openG = '';

	const streaming = liveChannel.guild.members.filter(member => member.user.presence.game && member.user.presence.game.streaming);

	for (const member of streaming) {
		console.log(streaming);
		/* Const streamID = member.user.presence.game.url.split('/').slice(3).join();
		const url = `https://api.twitch.tv/kraken/streams/${streamID}?client_id=${twitch}`;

		const { body: res } = await snekfetch.get(url); // eslint-disable-line no-await-in-loop

		if (!res.body.stream) return;
		if (res.body.stream.game !== 'H1Z1: King of the Kill') return;

		if (member.roles.has(gARoleId)) {
			groupA += `**${member.displayName}** - <${res.body.stream.channel.url}>\n`;
		} else if (member.roles.has(gBRoleId)) {
			groupB += `**${member.displayName}** - <${res.body.stream.channel.url}>\n`;
		} else if (member.roles.has(oGRoleId)) {
			openG += `**${member.displayName}** - <${res.body.stream.channel.url}>\n`;
		}*/
	}

	streamEmbed.setDescription(`${streamDescription}\n\n${groupA}\n${groupB}\n${openG}`);

	streamMessage.edit({ embed: streamEmbed });
}

exports.findUser = findUser;
exports.findMember = findMember;
exports.error = error;
exports.updateStreaming = updateStreaming;
