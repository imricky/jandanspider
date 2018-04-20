const HTTPBaseError = require('./http_base_error');

const ERROR_CODE = 5000000;

class InternalServerError extends HTTPBaseError {
  constructor(msg) {
    super(500, '服务器开小差了', ERROR_CODE, `something went wrong ${msg}`);
  }
}

module.exports = InternalServerError;