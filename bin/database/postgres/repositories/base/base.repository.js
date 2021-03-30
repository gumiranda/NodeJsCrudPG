class BaseRepository {
  static mapRowByListField(row, listField) {
    const result = {};

    listField.forEach((field) => (result[field.name] = row[field.name]));

    return result;
  }

  static mapListRowByListField(listRow, listField) {
    return listRow.map((row) => this.mapRowByListField(row, listField));
  }

  static getListColumn(entity) {
    return Object.keys(entity).join(', \n');
  }

  static getListParamValue(entity) {
    const listColumn = Object.keys(entity);
    let key = 0;

    return listColumn
      .map(() => {
        key++;

        return `$${key}`;
      })
      .join(', \n');
  }

  static getListValue(entity) {
    return Object.values(entity).map((value) => value);
  }

  static getListValues(entity) {
    const values = entity.map(item => { return Object.values(item).map((value) => value) })
    return values;
  }

  static expand(rowCount, columnCount, sequence=false){
    let index = 1
    if (sequence)
      return Array(rowCount).fill(0).map(_ => `(nextval('${sequence}'), ${Array(columnCount).fill(0).map(_ => `$${index++}`).join(", ")})`).join(", ")

    return Array(rowCount).fill(0).map(_ => `(${Array(columnCount).fill(0).map(_ => `$${index++}`).join(", ")})`).join(", ")
  }

  static getColumnAndParamValue(entity) {
    const listColumn = Object.keys(entity);
    let key = 0;

    const mapColumnAndValue = (column) => {
      key++;

      return `${column} = $${key}`;
    };

    return listColumn.map(mapColumnAndValue).join('\n');
  }
  static getColumnAndParamValueUpdate(entity, where) {
    const listColumn = Object.keys(entity);
    const listColumnWhere = Object.keys(where);
    let key = 0;

    const mapColumnAndValue = (column) => {
      key++;

      return `${column} = $${key}`;
    };

    return listColumn
      .map(mapColumnAndValue)
      .join('\n')
      .concat('\n WHERE ')
      .concat(listColumnWhere.map(mapColumnAndValue).join('\n'));
  }
}

module.exports = BaseRepository;
