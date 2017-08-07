const { updateStreaming } = require('../util.js');

async function handleEvent(oldM, newM) {
	if (oldM.presence.game && !oldM.presence.game.streaming) {
		if (newM.presence.game && newM.presence.game.streaming) {
			await updateStreaming(newM.client);
		}
	} else
	if (oldM.presence.game && oldM.presence.game.streaming) {
		if (newM.presence.game && !newM.presence.game.streaming) {
			await updateStreaming(newM.client);
		}
	}
}

exports.handleEvent = handleEvent;
