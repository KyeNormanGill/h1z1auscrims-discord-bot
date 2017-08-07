const { Client } = require('smooth-discord.js');

class H1Client extends Client {
	constructor(options) {
		super(options);

		this.streaming = [];
	}
}

module.exports = H1Client;
