const express = require('express');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/api/getRandom', (req, res) => {
	let num = Math.floor((Math.random() * 20) + 1);
	res.send({
		num: num,
	});
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
