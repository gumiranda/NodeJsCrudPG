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
		const sqlSelect = 'SELECT * FROM TB_MOVIE WHERE quantity > $1 and id=$2';
		const listValueSelect = [0, movieid];
		const { rows } = await this._base.query(sqlSelect, listValueSelect);
		if (!rows || !rows[0]) {
			return null;
		}
		const sqlUpdate = 'UPDATE TB_MOVIE SET quantity=$1 WHERE id=$2';
		const listValueUpdate = [rows[0].quantity - 1, rows[0].id];
		const resUpdate = await this._base.query(sqlUpdate, listValueUpdate);
		if (!resUpdate || !resUpdate.rowCount || resUpdate.rowCount < 1) {
			return null;
		}
		const id = await this._base.getSequence('id_seq_location');
		return this._base.create({ userid, status_location: 0, movieid, id });
	}

	async update(entity, where) {
		if (entity && entity.status_location && entity.status_location === 1) {
			const location = await this._base.get({ ...where, status_location: 0 });
			if (!location || !location[0]) {
				return null;
			}
			const sqlSelect = 'SELECT * FROM TB_MOVIE WHERE id=$1';
			const listValueSelect = [location[0].movieid];
			const { rows } = await this._base.query(sqlSelect, listValueSelect);
			if (!rows || !rows[0]) {
				return null;
			}
			const sqlUpdate = 'UPDATE TB_MOVIE SET quantity=$1 WHERE id=$2';
			const listValueUpdate = [rows[0].quantity + 1, rows[0].id];
			const resUpdate = await this._base.query(sqlUpdate, listValueUpdate);
			if (!resUpdate || !resUpdate.rowCount || resUpdate.rowCount < 1) {
				return null;
			}
		} else if (entity && entity.status_location === 0) {
			return null;
		}
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
