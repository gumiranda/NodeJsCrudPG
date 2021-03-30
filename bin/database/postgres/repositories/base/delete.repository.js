const BaseRepository = require('./base.repository');

class DeleteRepository {
	constructor(tableName) {
		this.tableName = tableName;
	}

	async delete(entity, pool) {
		try {
			const columnAndParamValue = BaseRepository.getColumnAndParamValue(entity);
			const listValue = BaseRepository.getListValue(entity);

			const sql = `DELETE FROM ${this.tableName} WHERE\n${columnAndParamValue}`;

			await pool.query(sql, listValue);

			return true;
		} catch (e) {
			console.log(e);
			throw new Error(e);
		}
	}

	async truncate(pool) {
		try {
			const sql = `TRUNCATE TABLE ${this.tableName}`;

			await pool.query(sql);

			return true;
		} catch (e) {
			console.log(e);
			throw new Error(e);
		}
	}
}

module.exports = DeleteRepository;
