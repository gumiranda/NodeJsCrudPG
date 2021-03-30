const jwt = require('jsonwebtoken');
const variables = require('../bin/configuration/variables');
const makeBaseResource = require('../bin/database/postgres/factories/base-resource.factory');
const pool = require('../bin/database/database.config');
module.exports = async (req, res, next) => {
	const authHeader = req.headers.authorization;
	const [, token] = authHeader.split(' ');
	if (token) {
		try {
			const decoded = await jwt.verify(token, variables.Security.secretKey);
			req.userLogged = decoded;
			const resource = makeBaseResource('tb_User');
			const userExists = await resource.find(
				{ id: req.userLogged.user.id },
				pool,
			);
			if (!userExists) {
				res.status(401).send({ message: 'Usuario não existe' });
				return;
			}
			next();
		} catch (e) {
			res.status(401).send({ message: 'Token é inválido' });
		}
	} else {
		res.status(401).send({ message: 'Token deve ser informado' });
	}
};
