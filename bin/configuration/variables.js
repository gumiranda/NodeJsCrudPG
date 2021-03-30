const variables = {
	Api: {
		port: process.env.port || 3333,
	},
	Database: {
		connection: process.env.connection,
	},
	Security: {
		secretKey: process.env.secretKey,
	},
};

module.exports = variables;
