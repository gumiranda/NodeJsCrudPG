const BaseResource = require('../resource/base.resource');
const makeInsertRepository = require('./insert-repository.factory');
const makeUpdateRepository = require('./update-repository.factory');
const makeFindRepository = require('./find-repository.factory');
const makeSearchRepository = require('./search-repository.factory');
const makeDeleteRepository = require('./delete-repository.factory');
const makeBaseResource = (tableName) =>
  new BaseResource(
    makeInsertRepository(tableName),
    makeUpdateRepository(tableName),
    makeFindRepository(tableName),
    makeSearchRepository(tableName),
    makeDeleteRepository(tableName)
  );

module.exports = makeBaseResource;
