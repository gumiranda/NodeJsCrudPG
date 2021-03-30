const BaseRepository = require('./base.repository');
const lodash = require('lodash');

class SearchRepository {
  constructor(tableName) {
    this.tableName = tableName;
  }
  changeSearchWhere(sqlWhere, filter) {
    return '';
  }

  changeSearchJoin(sqlWhere, filter) {
    return '';
  }

  search(sql, filter) {}

  async totalRecords(basePageable, pool) {
    try {
      const { sqlFrom, filter } = basePageable;
      let { sqlJoin = '', sqlWhere = '' } = basePageable;

      sqlWhere = sqlWhere.length === 0 ? 'WHERE 0=0 \n' : '';

      sqlJoin = this.changeSearchJoin(sqlJoin, filter);
      sqlWhere = this.changeSearchWhere(sqlWhere, filter);

      const sqlFinal = `SELECT count(*) as total \n${sqlFrom}\n${sqlJoin}\n${sqlWhere}`;

      const resultQuery = await pool.query(sqlFinal);

      const { rowCount, fields, rows } = resultQuery;

      if (rowCount === 0) return 0;

      const row = lodash.head(rows);

      const { total } = BaseRepository.mapRowByListField(row, fields);

      return parseInt(total);
    } catch (e) {
      return 0;
    }
  }

  getPageSize(totalElements, size) {
    const pageSize = totalElements / size;
    const pageSizeInt = Math.ceil(pageSize);

    return pageSizeInt < 0 ? 1 : pageSizeInt;
  }

  getOffsetInt(page, pageSize, size) {
    const pageAux = page - 1;

    if (pageAux < 1) return 0;
    if (pageAux >= pageSize) return (pageSize - 1) * size;

    return pageAux * size;
  }

  getPageNumber(page, pageSize) {
    if (page < 1) return 1;
    if (page > pageSize) return pageSize;

    return page;
  }

  async pageableResult(basePageable, pool) {
    try {
      const { sql, sqlFrom, sqlOrderBy = '', filter, pageable } = basePageable;
      let { sqlJoin = '', sqlWhere = '' } = basePageable;

      const { showAllRecordsOnSearch } = filter;
      const { page, size } = pageable;

      sqlWhere = sqlWhere.length === 0 ? 'WHERE 0=0 \n' : '';

      sqlJoin = this.changeSearchJoin(sqlJoin, filter);
      sqlWhere = this.changeSearchWhere(sqlWhere, filter);

      let offset = '';
      let limit = '';

      const totalElements = await this.totalRecords(basePageable);
      const pageSize = this.getPageSize(totalElements, size);

      if (!showAllRecordsOnSearch) {
        const offsetInt = this.getOffsetInt(page, pageSize, size);
        offset = `offset ${offsetInt}`;
        limit = `limit ${size}`;
      }

      const sqlFinal = `${sql}\n${sqlFrom}\n${sqlJoin}\n${sqlWhere}\n${sqlOrderBy}\n${offset} ${limit}`;

      const resultQuery = await pool.query(sqlFinal);

      const { fields, rows } = resultQuery;

      const result = BaseRepository.mapListRowByListField(rows, fields);
      const pageNumber = this.getPageNumber(page, pageSize);
      const numberOfElements = result.length;

      const pageableResult = {
        pageNumber,
        pageSize,
        numberOfElements,
        totalElements,
        result,
      };

      if (showAllRecordsOnSearch) {
        delete pageableResult.pageNumber;
        delete pageableResult.pageSize;
        delete pageableResult.numberOfElements;
      }

      return pageableResult;
    } catch (e) {
      return {
        totalElements: 0,
        result: [],
      };
    }
  }
}

module.exports = SearchRepository;
