const profile = require('../Data/profile.json');
const ApiResponse = require('../utils/ApiResponse');
const ValidateData = require('../utils/ValidateData');

const BasicController = {
  home: async (req, res) => {
    const data = profile;
    const message = 'My Rule-Validation API.';
    return ApiResponse(res, message, 'success', data);
  },

  validateRule: async (req, res) => {
    const { rule = null, data = null } = req.body;

    // VALIDATE RULE
    if (!rule) {
      const message = 'rule is required.';
      const response = null;
      return ApiResponse(res, message, 'error', response, 400);
    }

    if (typeof rule !== 'object') {
      const message = 'rule should be an object.';
      const response = null;
      return ApiResponse(res, message, 'error', response, 400);
    }

    if (Array.isArray(rule)) {
      const message = 'rule should be an object.';
      const response = null;
      return ApiResponse(res, message, 'error', response, 400);
    }

    const ruleData = Object.keys(rule);
    const ruleProperties = ['field', 'condition', 'condition_value'];
    const isValidPayload = ruleProperties.every((item) =>
      ruleData.includes(item)
    );

    if (!isValidPayload) {
      const message = 'Invalid JSON payload passed.';
      const response = null;
      return ApiResponse(res, message, 'error', response, 400);
    }

    // VALIDATE DATA
    if (!data || !Object.keys(data).length) {
      const message = 'data is required.';
      const response = null;
      return ApiResponse(res, message, 'error', response, 400);
    }

    if (typeof data !== 'object' && typeof data !== 'string') {
      const message = 'data can either be a JSON object, an array or a string.';
      const response = null;
      return ApiResponse(res, message, 'error', response, 400);
    }

    // WHEN DATA IS AN ARRAY
    if (typeof data === 'object' && Array.isArray(data)) {
      const { response, status } = ValidateData(
        rule,
        data[parseInt(rule.field)]
      );

      if (!response && status === 'error') {
        const message = `field ${rule.field} is missing from data.`;
        return ApiResponse(res, message, status, response, 400);
      }

      if (status === 'error') {
        const message = `field ${rule.field} failed validation.`;
        return ApiResponse(res, message, status, response, 400);
      }
      const message = `field ${rule.field} successfully validated.`;
      return ApiResponse(res, message, status, response, 200);

      // WHEN DATA IS A STRING
    } else if (typeof data === 'string') {
      const { response, status } = ValidateData(
        rule,
        data[parseInt(rule.field)]
      );

      if (!response && status === 'error') {
        const message = `field ${rule.field} is missing from data.`;
        return ApiResponse(res, message, status, response, 400);
      }

      if (status === 'error') {
        const message = `field ${rule.field} failed validation.`;
        return ApiResponse(res, message, status, response, 400);
      }
      const message = `field ${rule.field} successfully validated.`;
      return ApiResponse(res, message, status, response, 200);

      // WHEN DATA IS AN  OBJECT
    } else if (typeof data === 'object') {
      const ruleArr = Object.values(rule);

      // // VALIDATE REQUIRED DATA FIELD
      const dataField = Object.keys(data);
      let field = rule.field;
      const fieldArr = field.split('.');

      const isDataFieldIncluded = dataField.includes(fieldArr[0]);
      if (!isDataFieldIncluded) {
        const message = `field '${fieldArr[0]}' is missing from data.`;
        const response = null;
        return ApiResponse(res, message, 'error', response, 400);
      }

      // // FOR NESTED FIELD
      if (
        fieldArr.length > 1 &&
        fieldArr[fieldArr.length - 1] &&
        !data[fieldArr[0]][fieldArr[1]]
      ) {
        const message = `field '${field}' is missing from data.`;
        const response = null;
        return ApiResponse(res, message, 'error', response, 400);
      }

      let fieldToCheck =
        fieldArr[fieldArr.length - 1] && data[fieldArr[0]][fieldArr[1]]
          ? data[fieldArr[0]][fieldArr[1]]
          : data[fieldArr[0]];

      const { response, status } = ValidateData(rule, fieldToCheck);
      if (status === 'error') {
        const message = `field ${field} failed validation.`;
        return ApiResponse(res, message, status, response, 400);
      }
      const message = `field ${field} successfully validated.`;
      return ApiResponse(res, message, status, response, 200);
    }
  },
};

module.exports = BasicController;
