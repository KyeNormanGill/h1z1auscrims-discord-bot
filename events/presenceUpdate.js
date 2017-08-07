const { updateStreaming } = require('../util.js');

function handleEvent(oldM, newM) {
	if (oldM.presence.game && !oldM.presence.game.streaming) {
		if (newM.presence.game && newM.presence.game.streaming) {
			updateStreaming(newM.client);
		}
	} else
	if (oldM.presence.game && oldM.presence.game.streaming) {
		if (newM.presence.game && !newM.presence.game.streaming) {
			updateStreaming(newM.client);
		}
	}
}

exports.handleEvent = handleEvent;
