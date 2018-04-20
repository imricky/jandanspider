const HTTPBaseError = require('./http_base_error');

const ERROR_CODE = 3000001;

class NosuchUserError extends HTTPBaseError{
  constructor(id,username){
    super(404,'该用户不存在',ERROR_CODE,`no such user: name:${username},id:${id}`)
  }
}

module.exports = NosuchUserError;
