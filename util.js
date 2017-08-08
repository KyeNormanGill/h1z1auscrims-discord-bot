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
	setTimeout(() => {
		const channel = client.guilds.get('163508085497790467').channels.get('343979578089406474');
		const div1RoleId = '329312590390099971';
		const div2RoleId = '329312398198702080';
		channel.fetchMessage('343991659261984770').then(message1 => {
			channel.fetchMessage('344337647269052416').then(message2 => {
				const div1Embed = new Discord.RichEmbed().setColor(0xf63939);
				let div1 = '__No one streaming in **Division 1**__\n\n';
				const div1Multi = [];
				let div1MultiLink;
				const div2Embed = new Discord.RichEmbed().setColor(0xf63939);
				let div2 = '__No one streaming in **Division 2**__';
				const div2Multi = [];
				let div2MultiLink = '';

				const streaming = channel.guild.members.filter(member => member.user.presence.game && member.user.presence.game.streaming);

				streaming.forEach(mem => {	
					const streamID = mem.user.presence.game.url.split('/').slice(3).join();
					const url = `https://api.twitch.tv/kraken/streams/${streamID}?client_id=${twitch}`;

					snekfetch.get(url).then(res => {
						if (!res.body.stream) return;
						if (res.body.stream.game !== 'H1Z1: King of the Kill') return;

						if (mem.roles.has(div1RoleId)) {
							div1Multi.push(streamID);
							if (div1.startsWith('__**Division 1 streamers**__')) {
								div1 += `**${mem.displayName}** - <${res.body.stream.channel.url}>\n`;
							} else {
								div1 = `__**Division 1 streamers**__\n\n**${mem.displayName}** - <${res.body.stream.channel.url}>\n`;
							}
						} else
						if (mem.roles.has(div2RoleId)) {
							div2Multi.push(streamID);
							if (div2.startsWith('__**Division 2 streamers**__')) {
								div2 += `**${mem.displayName}** - <${res.body.stream.channel.url}>\n`;
							} else {
								div2 = `__**Division 2 streamers**__\n\n**${mem.displayName}** - <${res.body.stream.channel.url}>\n`;
							}
						}
					});
				});

				snekfetch.get(`http://tinyurl.com/api-create.php?url=http://multitwitch.tv/${div1Multi.join('/')}`).then(res => {
					snekfetch.get(`http://tinyurl.com/api-create.php?url=http://multitwitch.tv/${div2Multi.join('/')}`).then(res2 => {
						if (div1Multi.length > 1) {
							div1MultiLink = res.text;
							console.log(div1Multi.join('/'));
						}
						if (div2Multi.length > 1) {
							div2MultiLink = res2.text;
							console.log(div2Multi.join('/'));
						}
						console.log(`Updating live: ${new Date()}`);

						div1Embed.setDescription(`${div1}\n\n${div1MultiLink ? `**Multilink:** ${div1MultiLink}` : ''}`);
						div2Embed.setDescription(`${div2}\n\n${div2MultiLink ? `**Multilink:** ${div2MultiLink}` : ''}`);

						message1.edit({ embed: div1Embed }).then(() => {
							message2.edit({ embed: div2Embed }).catch(console.error);
						});
					});
				});
			});
		});
	}, 10000);
}

exports.findUser = findUser;
exports.findMember = findMember;
exports.error = error;
exports.updateStreaming = updateStreaming;
