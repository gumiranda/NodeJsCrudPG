const SearchRepository = require('../repositories/base/search.repository');

const makeSearchRepository = (tableName) => new SearchRepository(tableName);

module.exports = makeSearchRepository;
