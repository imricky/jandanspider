class User {
  constructor(firstName, lastName, age) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    User.id += 1;
    this.id = User.id;
  }

  getName() {
    return `${this.firstName} ${this.lastName}`
  }

  static insert(firstName, lastName, age) {
    const u = new User(firstName, lastName, age);
    User.users.push(u);
    return u
  }

  static getOneByName(firstName, lastName) {
    return User.users.find(u => u.firstName === firstName && u.lastName === lastName)
  }

  static getOneById(userId) {
    return User.users.find(u => u.id === userId)
  }

  static list() {
    return User.users;
  }

  // static get['UUID'](){
  //   return `www.qq.com`;
  // }
  //这样就可以直接用User.UUID了，因为class不支持属性，只支持方法

  //static 方法可以直接使用，不用实例化[即不用先new一个出来]


}

User.users = [];
User.id = 0;

module.exports = User;