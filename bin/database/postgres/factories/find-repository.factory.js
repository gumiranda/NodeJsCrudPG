const FindRepository = require('../repositories/base/find.repository');

const makeFindRepository = (tableName) => new FindRepository(tableName);

module.exports = makeFindRepository;
