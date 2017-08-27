const db = require('../providers/sqlite.js');
const Sequelize = require('sequelize');

const Requests = db.define('requests', {
	requestId: {
		type: Sequelize.STRING,
		unique: true
	},
	messageId: Sequelize.STRING,
	Complete: Sequelize.BOOLEAN,
	userId: Sequelize.STRING
});

module.exports = Requests;
