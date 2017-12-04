const Client = require('./struct/client.js');
const path = require('path');
const { token } = require('./config.json');
const { RichEmbed } = require('discord.js');
const util = require('./util.js');
const db = require('./providers/sqlite.js');

const client = new Client({
	owners: ['189696688657530880'],
	prefix: '-',
	commandDirectory: path.join(__dirname, 'commands'),
	debug: true,
	errorResponse: true
});

client.login(token);

client.once('ready', () => {
	db.sync();
	client.user.setPresence({ game: { name: 'More features coming soon...', type: 0 } });
	setTimeout(() => util.updateStreaming(client), 5000);
	setInterval(() => util.updateStreaming(client), 300000);
});

client.on('voiceStateUpdate', async(o, n) => {
	if (o.serverMute !== n.serverMute) {
		const audit = await o.guild.fetchAuditLogs({ limit: 1 });
		const log = audit.entries.first();
		const embed = new RichEmbed()
			.setColor(0xdde72f)
			.setAuthor(log.executor.avatarURL, log.executor.username)
			.setDescription(`**Action**: Voice ${n.serverMute ? 'mute' : 'unmute'}\n**User**: ${log.target.username}\n**Reason**: ${log.reason || 'Unspecified'}`)
			.setTimestamp(new Date())
			.setThumbnail(log.target.avatarURL);

		o.guild.channels.get('387128087705288705').send({ embed });
	}
});

client.on('guildMemberRemove', async mem => {
	const audit = await mem.guild.fetchAuditLogs({ limit: 1 });
	const log = audit.entries.first();

	if (log.target.id === mem.id && log.action === 'MEMBER_KICK' && log.createdTimestamp > (new Date().getTime() - 5000)) {
		const embed = new RichEmbed()
			.setColor(0xdde72f)
			.setAuthor(log.executor.avatarURL, log.executor.username)
			.setDescription(`**Action**: Kick\n**User**: ${log.target.username}\n**Reason**: ${log.reason || 'Unspecified'}`)
			.setTimestamp(new Date())
			.setThumbnail(log.target.avatarURL);

		mem.guild.channels.get('387128087705288705').send({ embed });
	}
});

client.on('guildBanAdd', async(g, u) => {
	const audit = await g.fetchAuditLogs({ limit: 1 });
	const log = audit.entries.first();

	if (log.target.id === u.id && log.action === 'MEMBER_BAN_ADD' && log.createdTimestamp > (new Date().getTime() - 5000)) {
		const embed = new RichEmbed()
			.setColor(0xdde72f)
			.setAuthor(log.executor.avatarURL, log.executor.username)
			.setDescription(`**Action**: Ban\n**User**: ${log.target.username}\n**Reason**: ${log.reason || 'Unspecified'}`)
			.setTimestamp(new Date())
			.setThumbnail(log.target.avatarURL);

		g.channels.get('387128087705288705').send({ embed });
	}
});

client.on('guildMemberUpdate', async(o, n) => {
	if (o.nickname !== n.nickname) {
		const audit = await o.guild.fetchAuditLogs({ limit: 1 });
		const log = audit.entries.first();

		if (log.target === log.executor) return;
		if (log.target.id === n.id && log.action === 'MEMBER_UPDATE' && log.createdTimestamp > (new Date().getTime() - 5000)) {
			const embed = new RichEmbed()
				.setColor(0xdde72f)
				.setAuthor(log.executor.avatarURL, log.executor.username)
				.setDescription(`**Action**: Rename\n**User**: ${log.target.username}\n**Reason**: ${log.reason || 'Unspecified'}`)
				.setTimestamp(new Date())
				.setThumbnail(log.target.avatarURL);

			o.guild.channels.get('387128087705288705').send({ embed });
		}
	}
});

client.on('message', message => require('./events/message.js').handle(message));

process.on('unhandledRejection', console.error);
