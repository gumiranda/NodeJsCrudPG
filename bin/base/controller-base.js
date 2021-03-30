exports.post = async (repository, validationContract, req, res) => {
	try {
		const data = req.body;
		if (!validationContract.isValid()) {
			res
				.status(400)
				.send({
					message: 'Existem dados inválidos na sua requisição',
					validation: validationContract.errors(),
				})
				.end();
			return;
		}
		const resultado = await repository.create(data);
		res.status(201).send(resultado);
	} catch (e) {
		res
			.status(500)
			.send({ message: 'Internal server error', error: e.toString() });
	}
};

exports.put = async (repository, validationContract, req, res) => {
	try {
		const data = req.body;
		if (!validationContract.isValid()) {
			res
				.status(400)
				.send({
					message: 'Existem dados inválidos na sua requisição',
					validation: validationContract.errors(),
				})
				.end();
			return;
		}
		const resultado = await repository.update(data, { id: req.params.id });
		res.status(202).send(resultado);
	} catch (e) {
		res
			.status(500)
			.send({ message: 'Internal server error', error: e.toString() });
	}
};
exports.get = async (repository, req, res) => {
	try {
		const resultado = await repository.get(req.query || {});
		res.status(200).send(resultado);
	} catch (e) {
		res
			.status(500)
			.send({ message: 'Erro no processamento', error: e.toString() });
	}
};

exports.delete = async (repository, req, res) => {
	try {
		const { id } = req.params;
		if (id) {
			const resultado = await repository.delete(id);
			if (resultado !== 'Operação Inválida') {
				res.status(200).send({ message: 'Registro excluído com sucesso' });
			} else {
				res.status(401).send({ message: 'Operação inválida' });
			}
		} else {
			res.status(500).send({ message: 'O parametro id precisa ser informado' });
		}
	} catch (e) {
		res
			.status(500)
			.send({ message: 'Internal server error', error: e.toString() });
	}
};
