const base = require('../../../bin/base/repository-base');

class locationRepository {
	constructor() {
		this._base = new base('tb_Location');
	}

	get(any) {
		return this._base.get(any);
	}

	async create(data) {
		const { userid, movieid } = data;
		const id = await this._base.getSequence('id_seq_location');
		return this._base.create({ userid, movieid, id });
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

module.exports = locationRepository;
