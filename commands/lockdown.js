const { Command } = require('smooth-discord.js');
const { Permissions } = require('discord.js');

module.exports = class LockdownCommand extends Command {
	constructor() {
		super({
			name: 'lockdown',
			description: 'Lockdown the discord.',
			guildOnly: true,
			aliases: ['mute']
		});
	}

	run(message) {
        if (message.member.roles.has('322794011133870080') || message.member.roles.has('292271962544275456')) {
            const everyone = message.guild.roles.get(message.guild.id);

            if (this._resolvePermissionNumber(everyone.permissions).includes('SEND_MESSAGES')) {
                // Isn't locked down
                everyone.setPermissisons(this._removeSendMessages(everyone.permissions));
                message.channel.send('Server is now locked. Only Administrators and Moderators can speak.');
            } else {
                // Is locked down
                everyone.setPermissisons(this._addSendMessages(everyone.permissions));
                message.channel.send('Server is no longer locked. Everyone can speak.');
            }
        }
	}

    _removeSendMessages(number) {
        const resolved = [];

        for (const key of Object.keys(Permissions.FLAGS)) {
            if (number & Permissions.FLAGS[key]) resolved.push(key);
        }

        resolved.splice(resolved.indexOf('SEND_MESSAGES'), 1);

        return resolved;
    }

    _addSendMessages(number) {
        const resolved = [];

        for (const key of Object.keys(Permissions.FLAGS)) {
            if (number & Permissions.FLAGS[key]) resolved.push(key);
        }

        return resolved.concat('SEND_MESSAGES');
    }

    _resolvePermissionNumber(number) {
        const resolved = [];

        for (const key of Object.keys(Permissions.FLAGS)) {
            if (number & Permissions.FLAGS[key]) resolved.push(key);
        }

        return resolved;
    }
};
