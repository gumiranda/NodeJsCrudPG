/* eslint-disable new-cap */
const repository = require('../repositories/movie-repository');
const validation = require('../../../bin/helpers/validation');
const ctrlBase = require('../../../bin/base/controller-base');

const _repo = new repository();

function movieController() {}

movieController.prototype.post = async (req, res) => {
	const validationContract = new validation();
	validationContract.isRequired(req.body.title, 'Informe o campo title');
	validationContract.isRequired(req.body.director, 'Informe o campo director');

	try {
		ctrlBase.post(_repo, validationContract, req, res);
	} catch (e) {
		res
			.status(500)
			.json({ message: 'Internal server error', error: e.toString() });
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
			.json({ message: 'Internal server error', error: e.toString() });
	}
};

movieController.prototype.get = async (req, res) => {
	ctrlBase.get(_repo, req, res);
};
movieController.prototype.getAvailable = async (req, res) => {
	try {
		const { title } = req.query;
		let sql = 'SELECT * FROM TB_MOVIE WHERE quantity > $1';
		let listValue = [0];
		if (title) {
			sql += ' AND title=$2';
			listValue.push(title);
		}
		const { rows } = await _repo.getAvailable(sql, listValue);
		if (!rows) {
			res.status(400).json({ message: 'Não foi possível retornar os filmes' });
			return;
		}
		res.status(200).json(rows);
	} catch (e) {
		res.status(500).json({ message: e.toString() });
	}
};

movieController.prototype.delete = async (req, res) => {
	const validationContract = new validation();
	validationContract.isRequired(req.params.id, 'Informe seu id ');
	ctrlBase.delete(_repo, req, res);
};

module.exports = movieController;
