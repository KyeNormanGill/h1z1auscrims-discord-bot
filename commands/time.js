const { Command } = require('smooth-discord.js');
const { get } = require('snekfetch');
const { RichEmbed } = require('discord.js');

module.exports = class TimeCommand extends Command {
	constructor() {
		super({
			name: 'time',
			description: 'Shows the current time in AEST(Australia/Sydney)',
			aliases: ['times', 'timing']
		});
	}

	run(message) {
		get('https://script.googleusercontent.com/macros/echo?user_content_key=PGjJ-v0SbziY8epfX6k0w5Q04X1X9ohwPDDOBKYQQpBUwQpLjgNqPk5u9aeSXHqNmgbLw18vER95jGvzKzPK5d_VMyfymuSdm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnJ9GRkcRevgjTvo8Dc32iw_BLJPcPfRdVKhJT5HNzQuXEeN3QFwl2n0M6ZmO-h7C6bwVq0tbM60-hWoa2zNWdermN87Htdh8QiuK637xZnZw&lib=MwxUjRcLr2qLlnVOLh12wSNkqcO1Ikdrk').then(res => {
			const embed = new RichEmbed()
				.setColor(0xf63939)
				.setDescription(`AEST time: **${res.body.fullDate}**`);
			message.channel.send({ embed });
		});
	}
};
