/* eslint-disable new-cap */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const repository = require('../repositories/movie-repository');
const validation = require('../../../bin/helpers/validation');
const ctrlBase = require('../../../bin/base/controller-base');
const variables = require('../../../bin/configuration/variables');

const _repo = new repository();

function movieController() {}

movieController.prototype.post = async (req, res) => {
	const validationContract = new validation();
	validationContract.isRequired(req.body.quantity, 'Informe o campo quantity');
	validationContract.isRequired(req.body.title, 'Informe o campo title');
	validationContract.isRequired(req.body.director, 'Informe o campo director');

	try {
		ctrlBase.post(_repo, validationContract, req, res);
	} catch (e) {
		res
			.status(500)
			.send({ message: 'Internal server error', error: e.toString() });
	}
};
movieController.prototype.put = async (req, res) => {
	const validationContract = new validation();
	validationContract.isRequired(req.params.id, 'Informe seu id ');

	try {
		ctrlBase.put(_repo, validationContract, req, res);
	} catch (e) {
		res
			.status(500)
			.send({ message: 'Internal server error', error: e.toString() });
	}
};

movieController.prototype.get = async (req, res) => {
	ctrlBase.get(_repo, req, res);
};

movieController.prototype.delete = async (req, res) => {
	const validationContract = new validation();
	validationContract.isRequired(req.params.id, 'Informe seu id ');
	ctrlBase.delete(_repo, req, res);
};

module.exports = movieController;
