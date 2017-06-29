const { Command } = require('smooth-discord.js');
const { get } = require('snekfetch');
const { RichEmbed } = require('discord.js');
const moment = require('moment');

module.exports = class TimeCommand extends Command {
	constructor() {
		super({
			name: 'time',
			description: 'Shows the current time in AEST(Australia/Sydney)',
			aliases: ['times', 'timing']
		});
	}

	run(message) {
		get('https://script.googleusercontent.com/macros/echo?user_content_key=EE5VFR2NVFb-Paj92a2Av1l-cD2uzLokuSK49QlQkd8T2x-kY2BuXZReB4NqBSGHmFqW45hmS-OEN0_Ieo3of3mHQR0FCzxWm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnJ9GRkcRevgjTvo8Dc32iw_BLJPcPfRdVKhJT5HNzQuXEeN3QFwl2n0M6ZmO-h7C6bwVq0tbM60-hWoa2zNWdermN87Htdh8QiuK637xZnZw&lib=MwxUjRcLr2qLlnVOLh12wSNkqcO1Ikdrk').then(res => {
			const time = moment(res.body.fullDate).format('h:mma, MMMM Do YYYY');
			const embed = new RichEmbed()
				.setColor(0xf63939)
				.setDescription(`Current time for AEST(Australia/Sydney): **${time}**`);
			message.channel.send({ embed });
		});
	}
};
