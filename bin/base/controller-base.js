exports.post = async (repository, validationContract, req, res) => {
	try {
		const data = req.body;
		if (!validationContract.isValid()) {
			res
				.status(400)
				.json({
					message: 'Existem dados inválidos na sua requisição',
					validation: validationContract.errors(),
				})
				.end();
			return;
		}
		const resultado = await repository.create(data);
		if (!resultado) {
			res
				.status(400)
				.json({ message: 'Não foi possível inserir o registro' })
				.end();
			return;
		}
		res.status(201).json(resultado);
	} catch (e) {
		res
			.status(500)
			.json({ message: 'Internal server error', error: e.toString() })
			.end();
		return;
	}
};

exports.put = async (repository, validationContract, req, res) => {
	try {
		const data = req.body;
		if (!validationContract.isValid()) {
			res
				.status(400)
				.json({
					message: 'Existem dados inválidos na sua requisição',
					validation: validationContract.errors(),
				})
				.end();
			return;
		}
		const resultado = await repository.update(data, { id: req.params.id });
		if (!resultado) {
			res
				.status(400)
				.json({ message: 'Não foi possível atualizar o registro' })
				.end();
			return;
		}
		res.status(202).json(resultado);
	} catch (e) {
		res
			.status(500)
			.json({ message: 'Internal server error', error: e.toString() })
			.end();
		return;
	}
};
exports.get = async (repository, req, res) => {
	try {
		const resultado = await repository.get(req.query || {});
		if (!resultado) {
			res
				.status(400)
				.json({ message: 'Não foi possível obter os registros' })
				.end();
			return;
		}
		res.status(200).json(resultado);
	} catch (e) {
		res
			.status(500)
			.json({ message: 'Erro no processamento', error: e.toString() })
			.end();
		return;
	}
};

exports.delete = async (repository, req, res) => {
	try {
		const { id } = req.params;
		if (id) {
			const resultado = await repository.delete(id);
			if (resultado !== 'Operação Inválida') {
				res.status(200).json({ message: 'Registro excluído com sucesso' });
			} else {
				res.status(401).json({ message: 'Operação inválida' }).end();
				return;
			}
		} else {
			res
				.status(500)
				.json({ message: 'O parametro id precisa ser informado' })
				.end();
			return;
		}
	} catch (e) {
		res
			.status(500)
			.json({ message: 'Internal server error', error: e.toString() })
			.end();
		return;
	}
};
