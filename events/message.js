const { RichEmbed } = require('discord.js');
const triggerWords = ['nigger', 'nigga', 'negro', 'coon', 'chink', 'gook'];
const { stripIndents } = require('common-tags');

async function handle(message) {
	if (triggerWords.some(word => message.content.toLowerCase().includes(word))) {
		await message.delete();
		await message.member.addRole(message.guild.roles.get('329522736927866880'));
		await message.reply('Please do not use racial slurs in discord. Your message has been deleted and you are now muted.');

		const embed = new RichEmbed()
			.setColor(0xdde72f)
			.setDescription(stripIndents`
				**Action**: Automated Racial filter
				**User**: ${message.author.tag}
				**Message Content**: ${message.content}
			`);

		await message.guild.channels.get('387128087705288705').send({ embed });
	}
}

exports.handle = handle;
