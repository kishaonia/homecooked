'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
  ///defines schema in options object
}
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    options.tableName = 'UsersSells';
    return queryInterface.bulkInsert(options, [
      {
  username: "johndoe",
  password:"password",
  firstName:"john",
  lastName:"doe",
  cuisine:"Chinese",
  specialty:"eggrolls",
  DOB: "01/01/1991",
  address: "Las Vegas, Nevada",
  profilephoto: "https://img.freepik.com/free-vector/cute-rabbit-with-duck-working-laptop-cartoon-illustration_56104-471.jpg",
}
], {});
},
  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'UsersSells';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['johndoe'] }
    }, {});
  }
};
