const makeBaseResource = require('../database/postgres/factories/base-resource.factory');
const pool = require('../database/database.config');

class baseRepository {
	constructor(model) {
		this._model = makeBaseResource(model);
	}

	create(data) {
		return this._model.save(data, pool);
	}

	update(entity, where) {
		return this._model.update(entity, where, pool);
	}

	getAll() {
		return this._model.find({}, pool);
	}

	delete(id) {
		return this._model.delete({ id }, pool);
	}

	getById(id) {
		return this._model.find({ id }, pool);
	}

	getSequence(sequence) {
		return this._model.getSequence(sequence, pool);
	}

	getByAny(any) {
		return this._model.find(any, pool);
	}
}

module.exports = baseRepository;
