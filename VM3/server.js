const express = require('express');
const bodyParser = require('body-parser');
const ping = require('ping');
const cors = require('cors');

const app = express();
const port = 8080;
const host = '0.0.0.0';

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let host1 = '172.17.0.3';
let host2 = '172.17.0.4';

app.get('/api/ping', (req, res) => {
	ping.sys.probe(host1, function(isAlive1) {
		var msg = isAlive1 ? 'host ' + host1 + ' is alive' : 'host ' + host1 + ' is dead';
		console.log(msg);
		ping.sys.probe(host2, function(isAlive2) {
			var msg = isAlive2 ? 'host ' + host2 + ' is alive' : 'host ' + host2 + ' is dead';
			console.log(msg);
			res.send({ isLive1: isAlive1, isLive2: isAlive2 });
		});
	});
});

app.listen(port, host, () => console.log(`Listening on port ${port}`));