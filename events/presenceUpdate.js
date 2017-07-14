const { twitch } = require('../config.json');
const snekfetch = require('snekfetch');
const fs = require('fs');
const path = require('path');
const Canvas = require('canvas');

function handleEvent(o, n) {
	const { streaming } = n.user.presence.game || {};
	if (!streaming) return;
	const start = new Date().getTime();
	/* Timestamps are stored to prevent spam
	* due to some oddities with the APIs.
	*/
	const timestamps = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'timestamps.json'), 'utf8'));

	if (!timestamps[n.id] || start > timestamps[n.id].timestamp + (360 * 6e4)) {
		timestamps[n.id] = timestamps[n.id] || {};
		timestamps[n.id].timestamp = start;
		const streamID = n.user.presence.game.url.split('/').slice(3).join();

		const url = `https://api.twitch.tv/kraken/streams/${streamID}?client_id=${twitch}`;
		snekfetch.get(url).then(res => {
			const canvas = new Canvas(550, 400);
			const ctx = canvas.getContext('2d');
			const { Image } = Canvas;

			ctx.fillStyle = '#6441A4';
			ctx.fillRect(0, 0, canvas.width, canvas.height);

			ctx.fillStyle = '#ffffff';
			ctx.fillRect(16.5, 16.5, 517, 293);

			ctx.fillRect(16.5, 321, 517, 62.5);

			ctx.fillStyle = '#6441A4';
			ctx.font = '26px Arial';
			ctx.fillText(res.body.stream.channel.display_name, 30, 350);

			ctx.font = '16px Arial';
			ctx.fillText(res.body.stream.game, 30, 375);

			ctx.font = '14px Arial';
			ctx.fillText(res.body.stream.channel.status.replace(/(.{30})/g, "$1\n"), 270, 342);

			snekfetch.get(res.body.stream.preview.large).then(imageRes => {
				const image = new Image();
				image.src = imageRes.body;
				ctx.drawImage(image, 19, 19, 512, 288);

				n.guild.channels.get('321907198592679948').send(`Go check them out! <${res.body.stream.channel.url}>`, { files: [{ attachment: canvas.toBuffer() }] });
			});
		});
	}

	fs.writeFile(path.join(__dirname, '..', 'data', 'timestamps.json'), JSON.stringify(timestamps), (err) => { if (err) console.error(err); });
}

exports.handleEvent = handleEvent;
