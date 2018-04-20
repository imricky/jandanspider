const HTTPBaseError = require('./http_base_error');

const ERROR_CODE = 4010001;

class NoAuthError extends HTTPBaseError{
  constructor(token){
    super(401,'您没有权限访问该资源',ERROR_CODE,`token:${token}`)
  }
}

module.exports = NoAuthError;
