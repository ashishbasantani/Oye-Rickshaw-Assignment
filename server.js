const express = require('express');

const app = express();
const db = require('./db_connection');
const port = 5000;

app.use(express.json());

require('./app/routes/index.js')(app, db);
app.listen(port, () => {
	console.log(`The server started at port no ${port}`);
})