const { updateStreaming } = require('../util.js');

function handleEvent(old, new) {
	if (old.presence.game && !old.presence.game.streaming) {
		if (new.presence.game && new.presence.game.streaming) {
			updateStreaming(new.client);
		}
	} else
	if (old.presence.game && old.presence.game.streaming) {
		if (new.presence.game && !new.presence.game.streaming) {
			updateStreaming(new.client);
		}
	}
}

exports.handleEvent = handleEvent;
