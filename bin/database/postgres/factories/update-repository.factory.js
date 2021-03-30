const UpdateRepository = require('../repositories/base/update.repository');

const makeUpdateRepository = (tableName) => new UpdateRepository(tableName);

module.exports = makeUpdateRepository;
