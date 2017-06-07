const twitchKey = require('./../info.json').keys.twitch;
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

		const url = `https://api.twitch.tv/kraken/streams/${streamID}?client_id=${twitchKey}`;
		snekfetch.get(url).then(res => {
			const status = res.body.stream.channel.status;
			const wrapRegex = new RegExp(`.{1,${44}}`, 'g');
			const lines = status.match(wrapRegex) || [];

			const wrappedStatus = lines.reduce((tot, cur) =>
				/\S$/.test(tot) && /^\S/.test(cur)
				? `${tot}-\n${cur}`
				: `${tot.trim()}\n${cur.trim()}`
			);

			const canvas = new Canvas(800, 200);
			const ctx = canvas.getContext('2d');
			const Image = Canvas.Image;
			const twitchLogo = new Image();
			/* http://i.imgur.com/yht9Iz8m.png */
			twitchLogo.src = path.join(__dirname, '..', 'data', 'images', 'twitch.png');

			ctx.fillStyle = '#FFFFFF';
			ctx.fillRect(0, 0, canvas.width, canvas.height);

			ctx.drawImage(twitchLogo, 0, 0, 200, 200);

			ctx.fillStyle = '#000000';
			ctx.font = '27px Arial';
			ctx.fillText(`${res.body.stream.channel.display_name}, is now live!`, 235, 50);

			ctx.font = '22px Arial';
			ctx.fillText(wrappedStatus, 235, 80);

			ctx.fillStyle = '#565656';
			ctx.fillText(`Playing: ${res.body.stream.game}`, 235, 180);

			n.guild.channels.get('321907198592679948').send(`Go check them out! <${res.body.stream.channel.url}>`, { files: [{ attachment: canvas.toBuffer() }] });
		});
	}

	fs.writeFile(path.join(__dirname, '..', 'data', 'timestamps.json'), JSON.stringify(timestamps), (err) => { if (err) console.error(err); });
}

exports.handleEvent = handleEvent;
