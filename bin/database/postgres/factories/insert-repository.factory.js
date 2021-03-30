const InsertRepository = require('../repositories/base/insert.repository');

const makeInsertRepository = (tableName) => new InsertRepository(tableName);

module.exports = makeInsertRepository;
