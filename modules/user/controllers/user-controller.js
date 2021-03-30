/* eslint-disable new-cap */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const repository = require('../repositories/user-repository');
const validation = require('../../../bin/helpers/validation');
const ctrlBase = require('../../../bin/base/controller-base');
const variables = require('../../../bin/configuration/variables');

const _repo = new repository();

function userController() {}

userController.prototype.post = async (req, res) => {
	const validationContract = new validation();
	validationContract.isRequired(req.body.nome, 'Informe seu nome');
	validationContract.isRequired(req.body.email, 'Informe seu email');
	validationContract.isRequired(req.body.password, 'Informe sua password');
	validationContract.isRequired(
		req.body.passwordConfirmation,
		'Informe sua password confirmação ',
	);
	validationContract.isTrue(
		req.body.passwordConfirmation !== req.body.password,
		'As passwords devem ser iguais ',
	);
	validationContract.isEmail(req.body.email, 'Informe um email válido ');

	try {
		const usuarioEmailExiste = await _repo.EmailExists(req.body.email);
		if (usuarioEmailExiste) {
			validationContract.isTrue(
				usuarioEmailExiste.nome !== undefined,
				`Já existe o email ${req.body.email} cadastrado no banco de dados`,
			);
		}
		const salt = await bcrypt.genSaltSync(10);
		req.body.password = await bcrypt.hashSync(req.body.password, salt);
		ctrlBase.post(_repo, validationContract, req, res);
	} catch (e) {
		res.status(500).send({ message: 'Internal server error', error: e });
	}
};
userController.prototype.put = async (req, res) => {
	const validationContract = new validation();
	validationContract.isRequired(req.body.nome, 'Informe seu nome ');
	validationContract.isRequired(req.params.id, 'Informe seu id ');
	validationContract.isRequired(req.body.email, 'Informe seu email ');
	validationContract.isRequired(req.body.password, 'Informe sua password ');
	validationContract.isRequired(
		req.body.passwordConfirmation,
		'Informe sua password confirmação ',
	);
	validationContract.isTrue(
		req.body.passwordConfirmation !== req.body.password,
		'As passwords devem ser iguais ',
	);
	validationContract.isEmail(req.body.email, 'Informe um email válido ');

	try {
		const usuarioEmailExiste = await _repo.EmailExists(req.body.email);
		if (usuarioEmailExiste) {
			validationContract.isTrue(
				usuarioEmailExiste.nome !== undefined &&
					usuarioEmailExiste._id !== req.params.id,
				`Já existe o email ${req.body.email} cadastrado no banco de dados`,
			);
		}
		if (req.usuarioLogado.user._id.toString() === req.params.id) {
			ctrlBase.put(_repo, validationContract, req, res);
		} else {
			res.status(401).send({ message: 'Você não tem permissão' });
		}
	} catch (e) {
		res.status(500).send({ message: 'Internal server error', error: e });
	}
};

userController.prototype.get = async (req, res) => {
	ctrlBase.get(_repo, req, res);
};
userController.prototype.delete = async (req, res) => {
	const validationContract = new validation();
	validationContract.isRequired(req.params.id, 'Informe seu id ');
	ctrlBase.delete(_repo, req, res);
};
userController.prototype.authenticate = async (req, res) => {
	const validationContract = new validation();
	validationContract.isRequired(req.body.email, 'Informe seu email ');
	validationContract.isRequired(req.body.password, 'Informe sua password ');
	validationContract.isRequired(
		req.body.passwordConfirmation,
		'Informe sua password confirmação ',
	);
	validationContract.isTrue(
		req.body.passwordConfirmation !== req.body.password,
		'As passwords devem ser iguais ',
	);
	validationContract.isEmail(req.body.email, 'Informe um email válido ');
	if (!validationContract.isValid()) {
		res.status(400).send({
			message: 'Não foi possível efetuar o login',
			validation: validationContract.errors(),
		});
		return;
	}
	const usuarioEncontrado = await _repo.authenticate(
		req.body.email,
		req.body.password,
		false,
	);
	if (usuarioEncontrado == null) {
		res
			.status(404)
			.send({ message: 'Usuario ou password informados são inválidos' });
	}
	if (usuarioEncontrado) {
		res.status(200).send({
			usuario: usuarioEncontrado,
			token: jwt.sign(
				{ user: usuarioEncontrado },
				variables.Security.secretKey,
			),
		});
	} else {
		res
			.status(404)
			.send({ message: 'Usuario ou password informados são inválidos' });
	}
};

module.exports = userController;
