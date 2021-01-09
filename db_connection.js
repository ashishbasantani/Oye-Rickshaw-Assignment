const Pool = require('pg').Pool;

const pool = new Pool({
	user: "postgres",
	password: "Ashish@8871",
	database: "todo_database",
	max: 10,
	host: "localhost",
	port: 5432
});

module.exports = pool;