const { Command } = require('smooth-discord.js');
const { findMember, error } = require('../util.js');

module.exports = class CaptainCommand extends Command {
	constructor() {
		super({
			name: 'captain',
			description: 'Gives the team captain role to a user for 6 hours. For use with the toqueue and toroom command.',
			guildOnly: true,
			ownerOnly: true
		});
	}

	run(message, args) {
		const member = findMember(message, args);

		if (member === null) {
			error('Please input a valid user', message);
		} else {
			const roleToGive = message.guild.roles.get('300601294706442241');

			member.addRole(roleToGive).then(mem => {
				message.reply(`**${member.displayName}** has been given the **${roleToGive.name}** role for 6 hours. This will be removed automatically.\n*unless i break during that time :')*`);
				setTimeout(() => {
					mem.removeRole(roleToGive);
				}, 10000);
			});
		}
	}
};
