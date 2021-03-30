const { Pool } = require('pg');

require('dotenv').config({
	path: '.env',
});

const pool = new Pool({
	host: process.env.DATABASE_URL,
	port: process.env.DB_PORT,
	database: process.env.DATABASE_NAME,
	user: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
});

module.exports = {
	query: (sql, params, callback) => {
		return pool.query(sql, params, callback);
	},
};
