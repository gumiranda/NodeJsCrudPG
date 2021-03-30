const BaseRepository = require('./base.repository');

class UpdateRepository {
  constructor(tableName) {
    this.tableName = tableName;
  }

  async update(entity, where, pool) {
    try {
      const columnAndParamValue = BaseRepository.getColumnAndParamValueUpdate(
        entity,
        where,
      );
      console.log(columnAndParamValue);
      const listValue = BaseRepository.getListValue({ ...entity, ...where });
      console.log(listValue);

      const sql = `UPDATE ${this.tableName} SET\n${columnAndParamValue}`;

      await pool.query(sql, listValue);

      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}

module.exports = UpdateRepository;
