module.exports = (rule, data) => {
  let isValidData = false;
  switch (rule.condition) {
    case 'eq':
      isValidData = data === rule.condition_value ? true : false;
      break;
    case 'neq':
      isValidData = data !== rule.condition_value ? true : false;
      break;
    case 'gt':
      isValidData = data > rule.condition_value ? true : false;
      break;
    case 'gte':
      isValidData = data >= rule.condition_value ? true : false;
      break;
    case 'contains':
      isValidData = data && data.includes(rule.condition_value) ? true : false;
      break;
    default:
      break;
  }

  if (!isValidData) {
    const response = data
      ? {
          validation: {
            error: true,
            field: rule.field,
            field_value: data,
            condition: rule.condition,
            condition_value: rule.condition_value,
          },
        }
      : null;
    return { response, status: 'error' };
  }

  const response = {
    validation: {
      error: false,
      field: rule.field,
      field_value: data,
      condition: rule.condition,
      condition_value: rule.condition_value,
    },
  };
  return { response, status: 'success' };
};
