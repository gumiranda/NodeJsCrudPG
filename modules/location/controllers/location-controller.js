/* eslint-disable new-cap */

const repository = require('../repositories/location-repository');
const validation = require('../../../bin/helpers/validation');
const ctrlBase = require('../../../bin/base/controller-base');

const _repo = new repository();

function locationController() {}

locationController.prototype.post = async (req, res) => {
	const validationContract = new validation();
	validationContract.isRequired(req.body.userid, 'Informe o campo userid');
	validationContract.isRequired(req.body.movieid, 'Informe o campo movieid');

	try {
		ctrlBase.post(_repo, validationContract, req, res);
	} catch (e) {
		res
			.status(500)
			.send({ message: 'Internal server error', error: e.toString() });
	}
};
locationController.prototype.put = async (req, res) => {
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

locationController.prototype.get = async (req, res) => {
	ctrlBase.get(_repo, req, res);
};

locationController.prototype.delete = async (req, res) => {
	const validationContract = new validation();
	validationContract.isRequired(req.params.id, 'Informe seu id ');
	ctrlBase.delete(_repo, req, res);
};

module.exports = locationController;
