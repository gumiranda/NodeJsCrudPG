const BaseRepository = require('./base.repository');
const lodash = require('lodash');

class FindRepository {
  constructor(tableName) {
    this.tableName = tableName;
  }
  async getSequence(sequenceName, pool) {
    const { rows } = await pool.query(`select nextval('${sequenceName}')`);
    return parseInt(rows[0].nextval);
  }
  async findFirst(entity, pool) {
    return await this.find(entity, pool, true);
  }
  async find(entity, pool, isFirst = false) {
    try {
      const columnAndParamValue = BaseRepository.getColumnAndParamValue(entity);
      const listValue = BaseRepository.getListValue(entity);

      const sql = `SELECT * FROM ${this.tableName} WHERE\n${columnAndParamValue}`;

      const resultQuery = await pool.query(sql, listValue);
      const { rowCount, fields, rows } = resultQuery;

      if (rowCount === 0) return null;

      if (!isFirst) return BaseRepository.mapListRowByListField(rows, fields);

      const row = lodash.head(rows);

      return BaseRepository.mapRowByListField(row, fields);
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  }
}

module.exports = FindRepository;
