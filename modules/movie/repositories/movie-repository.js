const bcrypt = require('bcryptjs');
const base = require('../../../bin/base/repository-base');

class movieRepository {
	constructor() {
		this._base = new base('tb_Movie');
	}

	get(any) {
		return this._base.get(any);
	}

	async create(data) {
		const { quantity, title, director } = data;
		const id = await this._base.getSequence('id_seq_movie');
		return this._base.create({ quantity, title, director, id });
	}

	async update(entity, where) {
		const updated = await this._base.update(entity, where);
		if (!updated) {
			return null;
		}
		return this._base.get(where);
	}

	delete(id) {
		return this._base.delete(id);
	}
}

module.exports = movieRepository;
