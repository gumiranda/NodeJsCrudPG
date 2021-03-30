const BaseRepository = require('./base.repository');
const lodash = require('lodash');

class InsertRepository {
	constructor(tableName) {
		this.tableName = tableName;
	}

	async save(entity, pool) {
		try {
			const listColumn = BaseRepository.getListColumn(entity);
			const listParamValue = BaseRepository.getListParamValue(entity);
			const listValue = BaseRepository.getListValue(entity);

			const sql = `INSERT INTO ${this.tableName} (
                            ${listColumn}
                         ) VALUES (
                            ${listParamValue}
                         ) RETURNING *`;

			const { rowCount, fields, rows } = await pool.query(sql, listValue);

			if (rowCount > 1)
				return BaseRepository.mapListRowByListField(rows, fields);

			const row = lodash.head(rows);

			return BaseRepository.mapRowByListField(row, fields);
		} catch (e) {
			console.log(e);
			throw new Error(e);
		}
	}

	async saveAll(pool, entity, sequence, pk) {
		try {
			// sort obj propertys
			const entitySort = entity.map((item) =>
				Object.keys(item)
					.sort()
					.reduce((r, k) => ((r[k] = item[k]), r), {}),
			);

			const chunks = lodash.chunk(entitySort, 1000);
			const listColumn = BaseRepository.getListColumn(entitySort[0]);
			let result = [];
			for (const items of chunks) {
				const listValue = BaseRepository.getListValues(items);
				const sql = `INSERT INTO ${this.tableName} (
          ${pk ? pk + ',' + listColumn : listColumn}
        ) VALUES 
          ${BaseRepository.expand(
						listValue.length,
						Object.keys(entitySort[0]).length,
						sequence,
					)}
        RETURNING *`;
				const { rows } = await pool.query(sql, lodash.flatten(listValue));
				result = result.concat(rows);
			}
			return result;
		} catch (e) {
			console.log(e);
			throw new Error(e);
		}
	}
}

module.exports = InsertRepository;
