const { RichEmbed } = require('discord.js');
const triggerWords = ['nigger', 'nigga', 'negro'];

async function handle(message) {
	if (triggerWords.some(word => message.content.toLowerCase().includes(word))) {
		await message.delete();
		await message.member.addRole(message.guild.roles.get('329522736927866880'));
		await message.reply('Please do not use racial slurs in discord. Your message has been deleted and you are now muted.');

		const embed = new RichEmbed()
			.setColor(0xf93535)
			.setDescription(`
			**Action**: Permanent Mute
			**User**: ${message.author.username}
			**Reason**: Racial slurs
			**Message Content**: ${message.content}
			`);

		await message.guild.channels.get('351251057407557634').send({ embed });
	}
}

exports.handle = handle;
