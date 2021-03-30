const DeleteRepository = require('../repositories/base/delete.repository');

const makeDeleteRepository = (tableName) => new DeleteRepository(tableName);

module.exports = makeDeleteRepository;
