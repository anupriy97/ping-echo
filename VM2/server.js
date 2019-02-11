const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/getRandom', (req, res) => {
	let num = Math.floor((Math.random() * 31) + 50);
	res.send({
		num: num,
	});
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
