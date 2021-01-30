const { home, validateRule } = require('../controller/BasicController');

const BasicRoute = (app) => {
  app.get('/', home);
  app.post('/validate-rule', validateRule);
};

module.exports = BasicRoute;
