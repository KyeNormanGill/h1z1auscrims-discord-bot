const db = require('../providers/sqlite.js');
const Sequelize = require('sequelize');

const Requests = db.define('requests', {
	messageId: Sequelize.STRING,
	content: Sequelize.STRING,
	userId: Sequelize.STRING
});

module.exports = Requests;
