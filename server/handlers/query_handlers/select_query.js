const selectQuery = (array, selectCriteria, tableName, matchingParam) => {
  let query = `select ${selectCriteria} from ${tableName} where (`;
  for (let i = 0; i < array.length; i++) {
    const id = array[i];
    if (i === array.length - 1) {
      query += `${matchingParam} = ${id})`;
    } else {
    query += `${matchingParam} = ${id} or `;
    }
  }
  return query; 
};

export default selectQuery; 
