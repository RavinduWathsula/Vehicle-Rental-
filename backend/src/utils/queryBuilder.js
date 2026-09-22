/**
 * Utility to parse query parameters into SQL WHERE clauses and pagination
 */
const buildVehicleQuery = (query) => {
  const conditions = [];
  const values = [];

  // 1. Filtering
  // Public users should only see active/available vehicles by default unless admin, 
  // but we'll let the controller/service set base filters.
  
  if (query.category) {
    conditions.push('category_id = ?');
    values.push(query.category);
  }
  
  if (query.fuel) {
    conditions.push('fuel_type = ?');
    values.push(query.fuel);
  }
  
  if (query.transmission) {
    conditions.push('transmission = ?');
    values.push(query.transmission);
  }
  
  if (query.seats) {
    conditions.push('seats >= ?');
    values.push(query.seats);
  }
  
  if (query.minPrice) {
    conditions.push('daily_price >= ?');
    values.push(query.minPrice);
  }
  
  if (query.maxPrice) {
    conditions.push('daily_price <= ?');
    values.push(query.maxPrice);
  }
  
  if (query.status) {
    conditions.push('status = ?');
    values.push(query.status);
  } else if (!query.includeAll) { // If not admin requesting all, default to available
    conditions.push('status = ?');
    values.push('available');
  }

  // Combine conditions
  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

  // 2. Sorting
  const allowedSortFields = ['daily_price', 'year', 'created_at', 'brand'];
  const sortField = allowedSortFields.includes(query.sortBy) ? query.sortBy : 'created_at';
  const sortOrder = query.sortOrder && query.sortOrder.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
  const orderByClause = `ORDER BY ${sortField} ${sortOrder}`;

  // 3. Pagination
  const page = parseInt(query.page, 10) > 0 ? parseInt(query.page, 10) : 1;
  const limit = parseInt(query.limit, 10) > 0 ? parseInt(query.limit, 10) : 10;
  const offset = (page - 1) * limit;
  const limitClause = `LIMIT ? OFFSET ?`;
  
  // Note: limit and offset must be numbers for mysql2 to parse them correctly with ? if using prepared statements
  // We will append them to values here, but make sure the DB driver is configured or we hardcode them safely.
  // Using explicit integers avoids string injection.
  const limitValues = [limit, offset];

  return {
    whereClause,
    orderByClause,
    limitClause,
    values: [...values, ...limitValues],
    countValues: values // For total count query, we don't include limit/offset
  };
};

module.exports = {
  buildVehicleQuery
};
