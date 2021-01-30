const profile = require('../Data/profile.json');
const ApiResponse = require('../utils/ApiResponse');

const ValidateRuleController = {
  validate: async (req, res, next) => {
    const { rule, data } = req.body;
    const response = { rule, data };
    return ApiResponse(res, 'My Rule-Validation API', 'success', response);
  },
};

module.exports = ValidateRuleController;
