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
	console.log('ran');
	const liveChannel = client.guilds.get('163508085497790467').channels.get('343979578089406474');

	const gARoleId = '375126184859795467';
	const gBRoleId = '375126417543004161';
	const oGRoleId = '352088277324398592';

	const streamMessage = await liveChannel.fetchMessage('343991659261984770');

	const streamEmbed = new RichEmbed();

	const streamDescription = '**Players streaming H1Z1**\n\n';

	let groupA = '';

	let groupB = '';

	let openG = '';

	const streaming = liveChannel.guild.members.filter(member => member.user.presence.game && member.user.presence.game.streaming);
	for (const member of streaming.values()) {
		const streamID = member.user.presence.game.url.split('/').slice(3).join();
		const url = `https://api.twitch.tv/kraken/streams/${streamID}?client_id=${twitch}`;
		console.log('1');
		const { body } = await snekfetch.get(url).catch(console.error); // eslint-disable-line no-await-in-loop
		console.log('2');
		if (!body.stream) return;
		console.log('3');
		if (body.stream.game !== 'H1Z1') return;
		console.log('4');
		console.log(`${member.displayName} - ${body.stream.channel.url}`);
		if (member.roles.has(gARoleId)) {
			groupA += `**${member.displayName}** - <${body.stream.channel.url}>\n`;
		} else if (member.roles.has(gBRoleId)) {
			groupB += `**${member.displayName}** - <${body.stream.channel.url}>\n`;
		} else if (member.roles.has(oGRoleId)) {
			openG += `**${member.displayName}** - <${body.stream.channel.url}>\n`;
		}
		console.log('5');
	}

	streamEmbed.setDescription(`${streamDescription}\ns\n${groupA}\n${groupB}\n${openG}`);
	console.log(`${streamDescription}\ns\n${groupA}\n${groupB}\n${openG}`);
	await streamMessage.edit({ embed: streamEmbed }).catch(console.error);
	console.log('updated');
}

exports.findUser = findUser;
exports.findMember = findMember;
exports.error = error;
exports.updateStreaming = updateStreaming;
